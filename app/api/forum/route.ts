// app/api/forum/posts/route.ts
// GET: Fetch posts from a container
// POST: Create a new post

import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const containerId = request.nextUrl.searchParams.get('containerId')

    if (!containerId) {
      return NextResponse.json(
        { error: 'containerId is required' },
        { status: 400 }
      )
    }

    // Fetch posts (RLS will handle visibility)
    const { data: posts, error } = await supabase
      .from('records')
      .select(
        `
        id,
        title,
        body,
        state,
        created_at,
        owner_id,
        users!owner_id(email)
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'post')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { containerId, title, body } = await request.json()

    if (!containerId || !title) {
      return NextResponse.json(
        { error: 'containerId and title are required' },
        { status: 400 }
      )
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create post (RLS will enforce permissions)
    const { data: post, error } = await supabase
      .from('records')
      .insert({
        container_id: containerId,
        kind: 'post',
        owner_id: user.id,
        title,
        body,
        state: 'open',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// app/api/forum/comments/route.ts
// GET: Fetch comments for a post
// POST: Create a comment on a post

export async function GET_comments(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const recordId = request.nextUrl.searchParams.get('recordId')

    if (!recordId) {
      return NextResponse.json(
        { error: 'recordId is required' },
        { status: 400 }
      )
    }

    // Fetch comments (RLS will handle visibility)
    const { data: comments, error } = await supabase
      .from('responses')
      .select(
        `
        id,
        body,
        created_at,
        user_id,
        users!user_id(email)
        `
      )
      .eq('record_id', recordId)
      .eq('kind', 'comment')
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ comments })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST_comments(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { recordId, body } = await request.json()

    if (!recordId || !body) {
      return NextResponse.json(
        { error: 'recordId and body are required' },
        { status: 400 }
      )
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create comment (RLS will enforce permissions)
    const { data: comment, error } = await supabase
      .from('responses')
      .insert({
        record_id: recordId,
        user_id: user.id,
        kind: 'comment',
        body,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ comment })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
