-- Migration 003 DOWN: Restore diagnostic, plan, and content tables

CREATE TABLE IF NOT EXISTS diagnostic_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_user_id
  ON diagnostic_sessions(user_id);

CREATE TABLE IF NOT EXISTS diagnostic_responses (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT NOT NULL REFERENCES diagnostic_sessions(id) ON DELETE CASCADE,
  pillar TEXT NOT NULL CHECK (pillar IN ('nutrition', 'sport', 'mind')),
  question_code TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, question_code)
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_responses_session_id
  ON diagnostic_responses(session_id);

CREATE TABLE IF NOT EXISTS profile_scores (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT NOT NULL UNIQUE REFERENCES diagnostic_sessions(id) ON DELETE CASCADE,
  nutrition_score INTEGER NOT NULL CHECK (nutrition_score BETWEEN 0 AND 100),
  sport_score INTEGER NOT NULL CHECK (sport_score BETWEEN 0 AND 100),
  mind_score INTEGER NOT NULL CHECK (mind_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_modules (
  id BIGSERIAL PRIMARY KEY,
  pillar TEXT NOT NULL CHECK (pillar IN ('nutrition', 'sport', 'mind')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  external_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_modules_pillar
  ON content_modules(pillar, is_active);

CREATE TABLE IF NOT EXISTS mapping_rules (
  id BIGSERIAL PRIMARY KEY,
  pillar TEXT NOT NULL CHECK (pillar IN ('nutrition', 'sport', 'mind')),
  min_score INTEGER NOT NULL CHECK (min_score BETWEEN 0 AND 100),
  max_score INTEGER NOT NULL CHECK (max_score BETWEEN 0 AND 100),
  content_id BIGINT NOT NULL REFERENCES content_modules(id) ON DELETE CASCADE,
  priority INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (min_score <= max_score)
);

CREATE INDEX IF NOT EXISTS idx_mapping_rules_lookup
  ON mapping_rules(pillar, min_score, max_score, is_active, priority);

CREATE TABLE IF NOT EXISTS plans (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id BIGINT NOT NULL REFERENCES diagnostic_sessions(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, version)
);

CREATE INDEX IF NOT EXISTS idx_plans_user_id_created
  ON plans(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS plan_items (
  id BIGSERIAL PRIMARY KEY,
  plan_id BIGINT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  pillar TEXT NOT NULL CHECK (pillar IN ('nutrition', 'sport', 'mind')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  content_id BIGINT REFERENCES content_modules(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'done')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (plan_id, scheduled_date, pillar, title)
);

CREATE INDEX IF NOT EXISTS idx_plan_items_plan_date
  ON plan_items(plan_id, scheduled_date);
