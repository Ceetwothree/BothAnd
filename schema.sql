-- ============================================
-- BothAnd MVP Schema v0
-- PostgreSQL with Row-Level Security
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS (global identity, not org-scoped)
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORGS (one org per deployment for MVP, but schema supports multi-org)
-- ============================================

CREATE TABLE orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  -- Branding: constrained to a fixed set of templates/colors, not freeform
  logo_url TEXT,
  banner_template TEXT NOT NULL DEFAULT 'centered'
    CHECK (banner_template IN ('logo-left', 'centered', 'full-banner')),
  accent_color TEXT NOT NULL DEFAULT 'slate'
    CHECK (accent_color IN ('slate', 'blue', 'green', 'purple', 'amber', 'rose'))
);

-- ============================================
-- ROLES & TENANCY
-- ============================================

CREATE TYPE org_role AS ENUM ('admin', 'staff', 'member');

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  org_id UUID REFERENCES orgs(id) NOT NULL,
  role org_role NOT NULL DEFAULT 'member',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, org_id)
);

-- ============================================
-- CONTAINERS (org-level grouping for workflows)
-- ============================================

CREATE TYPE container_kind AS ENUM ('board', 'inventory', 'events', 'journal', 'catalog', 'course');
CREATE TYPE visibility AS ENUM ('public', 'org', 'restricted', 'owner');

CREATE TABLE containers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES orgs(id) NOT NULL,
  kind container_kind NOT NULL,
  name TEXT NOT NULL,
  visibility visibility NOT NULL DEFAULT 'org',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RECORDS (posts, items, events, entries, lessons)
-- ============================================

CREATE TYPE record_kind AS ENUM ('post', 'item', 'event', 'entry', 'lesson');
CREATE TYPE record_state AS ENUM ('open', 'claimed', 'fulfilled', 'closed');

CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_id UUID REFERENCES containers(id) NOT NULL,
  kind record_kind NOT NULL,
  owner_id UUID REFERENCES users(id) NOT NULL,
  title TEXT,
  body TEXT,
  state record_state NOT NULL DEFAULT 'open',
  capacity INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RESPONSES (comments, claims, RSVPs, submissions)
-- ============================================

CREATE TYPE response_kind AS ENUM ('comment', 'claim', 'rsvp', 'submission');

CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID REFERENCES records(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  kind response_kind NOT NULL,
  body TEXT,
  qty INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW-LEVEL SECURITY (Tenancy Enforcement)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- USERS: Can only read/write their own record
CREATE POLICY users_self ON users
  FOR ALL
  USING (auth.uid()::uuid = id);

-- ORGS: Can read if member; can create own
CREATE POLICY orgs_member_read ON orgs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = orgs.id
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.status = 'active'
    )
  );

CREATE POLICY orgs_insert ON orgs
  FOR INSERT
  WITH CHECK (created_by = auth.uid()::uuid);

-- ORGS: Only admins can update branding (logo/template/color) or org details
CREATE POLICY orgs_admin_update ON orgs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = orgs.id
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.role = 'admin'
      AND memberships.status = 'active'
    )
  );

-- MEMBERSHIPS: Only admins can manage; members can read their own
CREATE POLICY memberships_read ON memberships
  FOR SELECT
  USING (
    user_id = auth.uid()::uuid
    OR EXISTS (
      SELECT 1 FROM memberships m2
      WHERE m2.org_id = memberships.org_id
      AND m2.user_id = auth.uid()::uuid
      AND m2.role = 'admin'
      AND m2.status = 'active'
    )
  );

CREATE POLICY memberships_admin_manage ON memberships
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM memberships m2
      WHERE m2.org_id = memberships.org_id
      AND m2.user_id = auth.uid()::uuid
      AND m2.role = 'admin'
      AND m2.status = 'active'
    )
  );

-- CONTAINERS: Visibility rules
-- Public: anyone can read
-- Org: members can read
-- Restricted: only explicit members + admin can read
-- Owner: only creator + admin can read

CREATE POLICY containers_public_read ON containers
  FOR SELECT
  USING (visibility = 'public');

CREATE POLICY containers_org_read ON containers
  FOR SELECT
  USING (
    visibility = 'org'
    AND EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = containers.org_id
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.status = 'active'
    )
  );

CREATE POLICY containers_owner_read ON containers
  FOR SELECT
  USING (
    visibility = 'owner'
    AND (created_by = auth.uid()::uuid OR
      EXISTS (
        SELECT 1 FROM memberships
        WHERE memberships.org_id = containers.org_id
        AND memberships.user_id = auth.uid()::uuid
        AND memberships.role = 'admin'
        AND memberships.status = 'active'
      )
    )
  );

CREATE POLICY containers_admin_write ON containers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = containers.org_id
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.role = 'admin'
      AND memberships.status = 'active'
    )
  );

-- RECORDS: Inherit container visibility
CREATE POLICY records_read ON records
  FOR SELECT
  USING (
    -- Public container
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = records.container_id
      AND containers.visibility = 'public'
    )
    OR
    -- Org container, user is member
    EXISTS (
      SELECT 1 FROM containers
      JOIN memberships ON memberships.org_id = containers.org_id
      WHERE containers.id = records.container_id
      AND containers.visibility = 'org'
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.status = 'active'
    )
    OR
    -- Owner container, user is creator or admin
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = records.container_id
      AND containers.visibility = 'owner'
      AND (
        records.owner_id = auth.uid()::uuid
        OR containers.created_by = auth.uid()::uuid
        OR EXISTS (
          SELECT 1 FROM memberships
          WHERE memberships.org_id = containers.org_id
          AND memberships.user_id = auth.uid()::uuid
          AND memberships.role = 'admin'
        )
      )
    )
  );

CREATE POLICY records_write ON records
  FOR INSERT
  WITH CHECK (
    owner_id = auth.uid()::uuid
    AND EXISTS (
      SELECT 1 FROM containers c
      JOIN memberships m ON m.org_id = c.org_id
      WHERE c.id = records.container_id
      AND m.user_id = auth.uid()::uuid
      AND m.status = 'active'
    )
  );

CREATE POLICY records_update_owner ON records
  FOR UPDATE
  USING (owner_id = auth.uid()::uuid);

-- RESPONSES: Same visibility as their parent record + container
CREATE POLICY responses_read ON responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM records r
      JOIN containers c ON c.id = r.container_id
      WHERE r.id = responses.record_id
      AND (
        c.visibility = 'public'
        OR (
          c.visibility = 'org'
          AND EXISTS (
            SELECT 1 FROM memberships
            WHERE memberships.org_id = c.org_id
            AND memberships.user_id = auth.uid()::uuid
            AND memberships.status = 'active'
          )
        )
        OR (
          c.visibility = 'owner'
          AND (
            r.owner_id = auth.uid()::uuid
            OR EXISTS (
              SELECT 1 FROM memberships
              WHERE memberships.org_id = c.org_id
              AND memberships.user_id = auth.uid()::uuid
              AND (memberships.role = 'admin' OR memberships.status = 'active')
            )
          )
        )
      )
    )
  );

CREATE POLICY responses_write ON responses
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()::uuid
    AND EXISTS (
      SELECT 1 FROM records r
      JOIN containers c ON c.id = r.container_id
      JOIN memberships m ON m.org_id = c.org_id
      WHERE r.id = responses.record_id
      AND m.user_id = auth.uid()::uuid
      AND m.status = 'active'
    )
  );

-- ============================================
-- STORAGE (org logos)
-- ============================================
-- Objects are stored at path "{org_id}/{filename}" so RLS can scope
-- uploads to admins of that org.

INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY logos_public_read ON storage.objects
  FOR SELECT
  USING (bucket_id = 'logos');

CREATE POLICY logos_admin_upload ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'logos'
    AND EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = (storage.foldername(name))[1]::uuid
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.role = 'admin'
      AND memberships.status = 'active'
    )
  );

CREATE POLICY logos_admin_update ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'logos'
    AND EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = (storage.foldername(name))[1]::uuid
      AND memberships.user_id = auth.uid()::uuid
      AND memberships.role = 'admin'
      AND memberships.status = 'active'
    )
  );

-- ============================================
-- SEED DATA (optional, for dev/testing)
-- ============================================

-- Create initial org "themission"
INSERT INTO orgs (id, name, slug) 
VALUES ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'The Mission', 'themission');

-- Create forum container (public)
INSERT INTO containers (id, org_id, kind, name, visibility)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '550e8400-e29b-41d4-a716-446655440000'::uuid,
  'board',
  'Forum',
  'public'
);
