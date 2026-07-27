-- rls_tests.sql
--
-- Codifies the manual "SET LOCAL ROLE authenticated; SET LOCAL
-- request.jwt.claim.sub = '<uuid>';" verification method (see
-- SETUP_GUIDE.md's Security Notes and README.md) into a repeatable script,
-- rather than re-deriving it by hand every time a schema/RLS change is
-- made. This is the same method that caught the real tenant-isolation
-- drift in July 2026 -- get_advisors did not and would not have caught it.
--
-- Run in the Supabase SQL editor, or:
--   psql "$DATABASE_URL" -f rls_tests.sql
--
-- Everything runs inside one transaction and is rolled back at the end --
-- no test data is left behind either way. If every assertion passes, the
-- script completes with a final NOTICE and no error. If anything fails,
-- it raises an exception naming exactly which check failed, and the whole
-- transaction (including the failure) rolls back.
--
-- This is NOT wired into CI yet -- run by hand after any change that
-- touches RLS policies, tenancy-relevant tables, or SECURITY DEFINER
-- functions. Not exhaustive: covers the tenant-isolation shape of bug
-- already found once, plus the newest tenancy-relevant column
-- (background_check_status). Extend it as new RLS surface is added,
-- rather than trusting a future change is fine because it looks similar
-- to something already covered.

BEGIN;

DO $$
DECLARE
  org_a_id UUID;
  org_b_id UUID;
  admin_a_id UUID;
  member_a_id UUID;
  admin_b_id UUID;
  container_b_id UUID;
  record_b_id UUID;
  membership_b_member_id UUID;
  v_count INT;
BEGIN
  -------------------------------------------------------------------
  -- Setup: two private orgs, each with an admin and a member, plus one
  -- container/record/response in org B. Runs as the SQL editor's own
  -- role (superuser / postgres), which bypasses RLS, exactly like any
  -- other setup script -- the tests below are what switch to a
  -- simulated real request.
  -------------------------------------------------------------------
  admin_a_id := gen_random_uuid();
  member_a_id := gen_random_uuid();
  admin_b_id := gen_random_uuid();

  INSERT INTO users (id, email) VALUES
    (admin_a_id, 'rls-test-admin-a@example.invalid'),
    (member_a_id, 'rls-test-member-a@example.invalid'),
    (admin_b_id, 'rls-test-admin-b@example.invalid');

  INSERT INTO orgs (name, slug, created_by, is_public, invite_code)
  VALUES ('RLS Test Org A', 'rls-test-org-a-' || substr(gen_random_uuid()::text, 1, 8), admin_a_id, false, gen_random_uuid()::text)
  RETURNING id INTO org_a_id;

  INSERT INTO orgs (name, slug, created_by, is_public, invite_code)
  VALUES ('RLS Test Org B', 'rls-test-org-b-' || substr(gen_random_uuid()::text, 1, 8), admin_b_id, false, gen_random_uuid()::text)
  RETURNING id INTO org_b_id;

  -- Two statements, not one multi-row INSERT: "RETURNING ... INTO" only
  -- captures the *first* row of a multi-row INSERT in PL/pgSQL, silently
  -- discarding the rest -- a single-row INSERT for org B's membership is
  -- the only way to reliably capture its id.
  INSERT INTO memberships (user_id, org_id, role, status) VALUES
    (admin_a_id, org_a_id, 'admin', 'active'),
    (member_a_id, org_a_id, 'member', 'active');

  INSERT INTO memberships (user_id, org_id, role, status)
  VALUES (admin_b_id, org_b_id, 'admin', 'active')
  RETURNING id INTO membership_b_member_id;

  INSERT INTO containers (org_id, kind, name, created_by)
  VALUES (org_b_id, 'board', 'RLS Test Board B', admin_b_id)
  RETURNING id INTO container_b_id;

  INSERT INTO records (container_id, kind, owner_id, title, body)
  VALUES (container_b_id, 'post', admin_b_id, 'Org B secret post', 'should not be readable from org A')
  RETURNING id INTO record_b_id;

  -------------------------------------------------------------------
  -- Test 1 (the historical bug, exact shape): a member of org A must
  -- not be able to read org B, a private org they don't belong to.
  -- This is precisely what the live orgs_read USING(true) drift broke.
  -------------------------------------------------------------------
  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claim.sub', member_a_id::text, true);

  SELECT count(*) INTO v_count FROM orgs WHERE id = org_b_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'FAILED (test 1): org A member could read private org B (tenant-isolation regression)';
  END IF;
  RAISE NOTICE 'PASSED (test 1): private org B invisible to an org A member';

  -------------------------------------------------------------------
  -- Test 2: org A member must not be able to read org B's containers.
  -------------------------------------------------------------------
  SELECT count(*) INTO v_count FROM containers WHERE id = container_b_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'FAILED (test 2): org A member could read org B''s container';
  END IF;
  RAISE NOTICE 'PASSED (test 2): org B''s container invisible to an org A member';

  -------------------------------------------------------------------
  -- Test 3: org A member must not be able to read org B's records.
  -------------------------------------------------------------------
  SELECT count(*) INTO v_count FROM records WHERE id = record_b_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'FAILED (test 3): org A member could read org B''s record';
  END IF;
  RAISE NOTICE 'PASSED (test 3): org B''s record invisible to an org A member';

  -------------------------------------------------------------------
  -- Test 4: org A member must not be able to write into org B's
  -- container -- attempting the insert should be blocked entirely.
  -------------------------------------------------------------------
  BEGIN
    INSERT INTO records (container_id, kind, owner_id, title, body)
    VALUES (container_b_id, 'post', member_a_id, 'cross-org write attempt', 'should be blocked');
    RAISE EXCEPTION 'FAILED (test 4): org A member was able to write into org B''s container';
  EXCEPTION
    WHEN OTHERS THEN
      IF SQLERRM LIKE 'FAILED%' THEN
        RAISE;
      END IF;
      RAISE NOTICE 'PASSED (test 4): write into org B''s container blocked for an org A member';
  END;

  -------------------------------------------------------------------
  -- Test 5: a plain member (not admin) must not be able to change
  -- another member's role, status, or background_check_status --
  -- memberships_admin_update requires is_org_admin().
  -------------------------------------------------------------------
  UPDATE memberships SET background_check_status = 'cleared'
  WHERE org_id = org_a_id AND user_id = admin_a_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'FAILED (test 5): a plain member updated another member''s background_check_status';
  END IF;
  RAISE NOTICE 'PASSED (test 5): plain member blocked from updating background_check_status';

  -------------------------------------------------------------------
  -- Test 6 (positive path): org B's own admin CAN set a background
  -- check status on org B's own membership row -- confirms test 5
  -- failed for the right reason (admin gate), not because the column
  -- is broken or unwritable entirely.
  -------------------------------------------------------------------
  PERFORM set_config('request.jwt.claim.sub', admin_b_id::text, true);

  UPDATE memberships SET background_check_status = 'cleared'
  WHERE id = membership_b_member_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  IF v_count != 1 THEN
    RAISE EXCEPTION 'FAILED (test 6): org B''s own admin could not update its own membership''s background_check_status';
  END IF;
  RAISE NOTICE 'PASSED (test 6): org B''s admin can update background_check_status within its own org';

  -------------------------------------------------------------------
  -- Test 7: org A member must not be able to read org B admin's email
  -- via the users table (no shared org between them).
  -------------------------------------------------------------------
  PERFORM set_config('request.jwt.claim.sub', member_a_id::text, true);

  SELECT count(*) INTO v_count FROM users WHERE id = admin_b_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'FAILED (test 7): org A member could read org B admin''s user row';
  END IF;
  RAISE NOTICE 'PASSED (test 7): org B admin''s profile invisible to an unrelated org A member';

  RESET ROLE;
  RAISE NOTICE 'ALL RLS REGRESSION TESTS PASSED';
END $$;

ROLLBACK;
