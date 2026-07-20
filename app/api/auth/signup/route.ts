import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500 }
      )
    }

    // Create user record in users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
      })

    if (userError) {
      console.error('Error creating user record:', userError)
    }

    // Add user to default org as member
    const { data: org } = await supabase
      .from('orgs')
      .select('id')
      .eq('slug', process.env.NEXT_PUBLIC_DEFAULT_ORG_SLUG)
      .single()

    if (org) {
      await supabase
        .from('memberships')
        .insert({
          user_id: authData.user.id,
          org_id: org.id,
          role: 'member',
          status: 'active',
        })
    }

    return NextResponse.json({
      message: 'Signup successful',
      user: authData.user,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
