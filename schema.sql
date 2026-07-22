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
  -- Drawn from the same considered palette as BothAnd's own site theme
  -- (app/globals.css) -- pine/ochre are literally the site's teal/gold --
  -- rather than a generic default-Tailwind rainbow.
  accent_color TEXT NOT NULL DEFAULT 'ink'
    CHECK (accent_color IN ('pine', 'indigo', 'plum', 'ochre', 'clay', 'ink')),
  -- Multi-org identity: public orgs are browsable/self-joinable,
  -- private orgs are invite-link only (distinct from containers.visibility)
  is_public BOOLEAN NOT NULL DEFAULT false,
  invite_code TEXT UNIQUE,
  -- Org identity beyond branding: a short mission statement (home page +
  -- invite preview) and a longer about_text (the org's /about page).
  mission_statement TEXT,
  about_text TEXT,
  -- Social/contact links -- either null or a real https URL/email, not
  -- freeform, matching the constrained-not-freeform branding fields above.
  facebook_url TEXT
    CHECK (facebook_url IS NULL OR facebook_url LIKE 'https://%'),
  instagram_url TEXT
    CHECK (instagram_url IS NULL OR instagram_url LIKE 'https://%'),
  x_url TEXT
    CHECK (x_url IS NULL OR x_url LIKE 'https://%'),
  website_url TEXT
    CHECK (website_url IS NULL OR website_url LIKE 'https://%'),
  contact_email TEXT
    CHECK (contact_email IS NULL OR contact_email LIKE '%@%')
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
  -- Only meaningful for kind='event' -- nullable like every other kind-
  -- specific column here (title/body/capacity), since one table serves
  -- posts/items/events/entries/lessons.
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RESPONSES (comments, claims, RSVPs, submissions)
-- ============================================

-- 'attended' is marked by a staff/admin *on behalf of* another member
-- (qty holds hours worked, for grant reporting), unlike every other kind
-- here where the response's own user_id is always the actor.
CREATE TYPE response_kind AS ENUM ('comment', 'claim', 'rsvp', 'submission', 'attended');

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
-- HELPER FUNCTIONS (used by RLS policies)
-- ============================================
-- SECURITY DEFINER so its internal query bypasses RLS -- a policy on
-- memberships that queried memberships directly caused Postgres to detect
-- infinite recursion (evaluating the policy requires the subquery, which
-- requires evaluating the policy again). Routing the check through a
-- function that runs with elevated privileges internally breaks the cycle.
CREATE OR REPLACE FUNCTION is_org_admin(p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE org_id = p_org_id
    AND user_id = auth.uid()::uuid
    AND role = 'admin'
    AND status = 'active'
  );
$$;

REVOKE ALL ON FUNCTION is_org_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_org_admin(UUID) TO authenticated;

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

-- USERS: an org admin can additionally read (SELECT-only, OR'd with
-- users_self above) the profile of anyone who is a member of an org they
-- administer -- otherwise a member-management UI would show every member's
-- email as null except the viewer's own.
CREATE POLICY users_org_admin_read ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memberships m
      WHERE m.user_id = users.id
      AND is_org_admin(m.org_id)
    )
  );

-- ORGS: Can read if member, or if the org is public (browsable/joinable).
-- (A stray `orgs_read USING (true)` policy existed on the live project for
-- a time -- applied directly, never reflected here -- and made every org
-- row, invite_code included, readable by anyone with no login at all. Fixed
-- live via the fix_tenant_isolation_rls_drift migration; this file was
-- already correct, so nothing here changed, only the live DB did.)
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

CREATE POLICY orgs_public_read ON orgs
  FOR SELECT
  USING (is_public = true);

-- No direct INSERT policy: org creation goes through create_org_with_admin()
-- only, so an org row can never exist without an admin membership alongside it.

-- ORGS: Only admins can update branding, public/private, invite code, etc.
CREATE POLICY orgs_admin_update ON orgs
  FOR UPDATE
  USING (is_org_admin(orgs.id));

-- MEMBERSHIPS: Only admins can manage; members can read their own
CREATE POLICY memberships_read ON memberships
  FOR SELECT
  USING (
    user_id = auth.uid()::uuid
    OR is_org_admin(org_id)
  );

CREATE POLICY memberships_admin_manage ON memberships
  FOR INSERT
  WITH CHECK (is_org_admin(org_id));

-- Admins can change a member's role or deactivate/reactivate them. Mirrors
-- orgs_admin_update: same is_org_admin() gate, no narrower column scoping
-- since an org admin already has full authority over org_id here.
CREATE POLICY memberships_admin_update ON memberships
  FOR UPDATE
  USING (is_org_admin(org_id))
  WITH CHECK (is_org_admin(org_id));

-- Any user can join a PUBLIC org directly, but only as a plain active
-- member -- never self-granted admin/staff. Joining a PRIVATE org must go
-- through join_org_by_invite_code() instead, since this policy has no way
-- to verify an invite code was actually presented.
CREATE POLICY memberships_self_insert ON memberships
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()::uuid
    AND role = 'member'
    AND status = 'active'
    AND EXISTS (
      SELECT 1 FROM orgs
      WHERE orgs.id = memberships.org_id
      AND orgs.is_public = true
    )
  );

-- CONTAINERS: Visibility rules
-- Public: anyone can read
-- Org / restricted: active members can read (restricted is a defined
-- visibility value that no workflow actually sets today, so it's folded
-- into the same active-membership check as 'org' rather than left with no
-- read policy at all -- the latter would silently make any future
-- restricted container unreadable by anyone, including its own org).
-- Owner: only creator + admin can read
--
-- (containers_org and containers_restricted existed on the live project
-- with no membership check at all -- and containers_insert allowed any
-- authenticated user to create a container under any org, no admin check.
-- Fixed live via fix_tenant_isolation_rls_drift; this file already
-- documented the intended checks below.)

CREATE POLICY containers_public ON containers
  FOR SELECT
  USING (visibility = 'public');

CREATE POLICY containers_org_read ON containers
  FOR SELECT
  USING (
    visibility IN ('org', 'restricted')
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

-- RECORDS: Inherit container visibility. Split into one policy per case
-- (rather than one big USING with ORs) so each is independently readable
-- and matches how these actually ended up applied live.
--
-- (records_org and records_insert existed on the live project with no
-- membership check at all -- any authenticated user could read any org's
-- records in an 'org'-visibility container, or insert a record into any
-- container regardless of membership. Fixed live via
-- fix_tenant_isolation_rls_drift.)

CREATE POLICY records_public ON records
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = records.container_id
      AND containers.visibility = 'public'
    )
  );

CREATE POLICY records_org_read ON records
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM containers c
      JOIN memberships m ON m.org_id = c.org_id
      WHERE c.id = records.container_id
      AND c.visibility IN ('org', 'restricted')
      AND m.user_id = auth.uid()::uuid
      AND m.status = 'active'
    )
  );

-- A user can always read a record they own, regardless of the container's
-- visibility -- not a cross-tenant leak, just "you can see what you wrote."
CREATE POLICY records_owner ON records
  FOR SELECT
  USING (owner_id = auth.uid()::uuid);

-- Owner-visibility container: the container's creator or an org admin can
-- see every record in it, not just their own (see journal/page.tsx, the
-- only workflow that uses 'owner' visibility today).
CREATE POLICY records_owner_visibility ON records
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM containers c
      WHERE c.id = records.container_id
      AND c.visibility = 'owner'
      AND (
        c.created_by = auth.uid()::uuid
        OR EXISTS (
          SELECT 1 FROM memberships m
          WHERE m.org_id = c.org_id
          AND m.user_id = auth.uid()::uuid
          AND m.role = 'admin'
          AND m.status = 'active'
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

CREATE POLICY records_update ON records
  FOR UPDATE
  USING (owner_id = auth.uid()::uuid);

CREATE POLICY records_delete_owner ON records
  FOR DELETE
  USING (owner_id = auth.uid()::uuid);

-- RESPONSES: Same visibility as their parent record + container.
--
-- (responses_read existed on the live project as just
-- `EXISTS (SELECT 1 FROM records WHERE records.id = responses.record_id)`
-- -- true for any response whose parent record exists at all, i.e. every
-- response on the platform was readable by anyone. responses_insert
-- likewise had no membership check. Fixed live via
-- fix_tenant_isolation_rls_drift; this file's admin-or-active-member OR
-- below was also its own latent bug -- any active member, not just an
-- admin, satisfied it -- now AND'd correctly, and a container-creator
-- branch was added to mirror records_owner_visibility above.)
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
          c.visibility IN ('org', 'restricted')
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
            OR c.created_by = auth.uid()::uuid
            OR EXISTS (
              SELECT 1 FROM memberships
              WHERE memberships.org_id = c.org_id
              AND memberships.user_id = auth.uid()::uuid
              AND memberships.role = 'admin'
              AND memberships.status = 'active'
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

-- Lets a user remove or edit their own response (RSVP, claim, submission,
-- comment) -- without this, none of those are ever undoable or editable
-- once made.
CREATE POLICY responses_delete_own ON responses
  FOR DELETE
  USING (user_id = auth.uid()::uuid);

CREATE POLICY responses_update_own ON responses
  FOR UPDATE
  USING (user_id = auth.uid()::uuid);

-- Attendance is marked by staff/admin on behalf of another member, so the
-- self-scoped policies above don't apply -- these are separate permissive
-- policies (OR'd with the ones above by Postgres, not a replacement).
CREATE POLICY responses_attendance_write ON responses
  FOR INSERT
  WITH CHECK (
    kind = 'attended'
    AND EXISTS (
      SELECT 1 FROM records r
      JOIN containers c ON c.id = r.container_id
      JOIN memberships m ON m.org_id = c.org_id
      WHERE r.id = responses.record_id
      AND m.user_id = auth.uid()::uuid
      AND m.role IN ('admin', 'staff')
      AND m.status = 'active'
    )
  );

CREATE POLICY responses_attendance_update ON responses
  FOR UPDATE
  USING (
    kind = 'attended'
    AND EXISTS (
      SELECT 1 FROM records r
      JOIN containers c ON c.id = r.container_id
      JOIN memberships m ON m.org_id = c.org_id
      WHERE r.id = responses.record_id
      AND m.user_id = auth.uid()::uuid
      AND m.role IN ('admin', 'staff')
      AND m.status = 'active'
    )
  );

CREATE POLICY responses_attendance_delete ON responses
  FOR DELETE
  USING (
    kind = 'attended'
    AND EXISTS (
      SELECT 1 FROM records r
      JOIN containers c ON c.id = r.container_id
      JOIN memberships m ON m.org_id = c.org_id
      WHERE r.id = responses.record_id
      AND m.user_id = auth.uid()::uuid
      AND m.role IN ('admin', 'staff')
      AND m.status = 'active'
    )
  );

-- ============================================
-- FUNCTIONS (RPC)
-- ============================================
-- SECURITY DEFINER: these bypass RLS internally by design, so each one
-- does exactly one narrow, auth.uid()-scoped thing and nothing else.

-- Atomically creates an org, grants its creator admin membership, and
-- gives it a default board container. Client inserts for orgs/memberships
-- are otherwise closed off specifically so this is the only path to an
-- org existing -- a partial failure (e.g. slug collision) rolls back the
-- whole call rather than leaving an adminless org behind.
CREATE OR REPLACE FUNCTION create_org_with_admin(
  p_name TEXT,
  p_slug TEXT,
  p_is_public BOOLEAN DEFAULT false
)
RETURNS orgs
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org orgs;
  v_uid UUID := auth.uid()::uuid;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO orgs (name, slug, created_by, is_public, invite_code)
  VALUES (p_name, p_slug, v_uid, p_is_public, replace(gen_random_uuid()::text, '-', ''))
  RETURNING * INTO v_org;

  INSERT INTO memberships (user_id, org_id, role, status)
  VALUES (v_uid, v_org.id, 'admin', 'active');

  INSERT INTO containers (org_id, kind, name, visibility, created_by)
  VALUES (
    v_org.id, 'board', 'Board',
    (CASE WHEN p_is_public THEN 'public' ELSE 'org' END)::visibility,
    v_uid
  );

  RETURN v_org;
END;
$$;

REVOKE ALL ON FUNCTION create_org_with_admin(TEXT, TEXT, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION create_org_with_admin(TEXT, TEXT, BOOLEAN) TO authenticated;

-- The only way to join a PRIVATE org: validates the invite code
-- server-side before inserting, which memberships_self_insert cannot do
-- on its own since RLS has no way to check what code the client presented.
CREATE OR REPLACE FUNCTION join_org_by_invite_code(p_code TEXT)
RETURNS memberships
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org_id UUID;
  v_uid UUID := auth.uid()::uuid;
  v_membership memberships;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT id INTO v_org_id FROM orgs WHERE invite_code = p_code;
  IF v_org_id IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired invite code';
  END IF;

  INSERT INTO memberships (user_id, org_id, role, status)
  VALUES (v_uid, v_org_id, 'member', 'active')
  ON CONFLICT (user_id, org_id) DO UPDATE SET status = 'active'
  RETURNING * INTO v_membership;

  RETURN v_membership;
END;
$$;

REVOKE ALL ON FUNCTION join_org_by_invite_code(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION join_org_by_invite_code(TEXT) TO authenticated;

-- Self-service leave: soft-deactivates the caller's own membership. Blocks
-- the sole remaining active admin from leaving, since that would strand
-- the org with no one able to manage it.
CREATE OR REPLACE FUNCTION leave_org(p_org_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid()::uuid;
  v_role org_role;
  v_active_admin_count INT;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT role INTO v_role FROM memberships
  WHERE org_id = p_org_id AND user_id = v_uid AND status = 'active';

  IF v_role IS NULL THEN
    RAISE EXCEPTION 'Not an active member of this organization';
  END IF;

  IF v_role = 'admin' THEN
    SELECT count(*) INTO v_active_admin_count FROM memberships
    WHERE org_id = p_org_id AND role = 'admin' AND status = 'active';

    IF v_active_admin_count <= 1 THEN
      RAISE EXCEPTION 'You are the only admin -- promote someone else before leaving';
    END IF;
  END IF;

  UPDATE memberships SET status = 'inactive' WHERE org_id = p_org_id AND user_id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION leave_org(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION leave_org(UUID) TO authenticated;

-- Lets /join/[code] show "You're invited to join X" before the user
-- commits, without exposing invite_code itself or needing a listable RLS
-- policy on orgs (which would let anyone enumerate every private org).
CREATE OR REPLACE FUNCTION get_org_preview_by_invite_code(p_code TEXT)
RETURNS TABLE(id UUID, name TEXT, slug TEXT, logo_url TEXT, banner_template TEXT, accent_color TEXT, mission_statement TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT id, name, slug, logo_url, banner_template, accent_color, mission_statement
  FROM orgs
  WHERE invite_code = p_code;
$$;

REVOKE ALL ON FUNCTION get_org_preview_by_invite_code(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_org_preview_by_invite_code(TEXT) TO authenticated;

-- ============================================
-- STORAGE (org logos)
-- ============================================
-- Objects are stored at path "{org_id}/{filename}" so RLS can scope
-- uploads to admins of that org.

INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- No SELECT policy needed: public buckets serve objects via the public URL
-- without going through storage RLS. A SELECT policy would only enable
-- bucket-wide listing via the storage API, which the app never uses.

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

-- No seed data: a raw INSERT here would bypass create_org_with_admin(),
-- the only path that also inserts an admin membership -- exactly what
-- happened to the old seeded "themission" org, which could never have an
-- admin and had to be deleted. Create any demo org through the normal
-- signup + create_org_with_admin() flow instead.
