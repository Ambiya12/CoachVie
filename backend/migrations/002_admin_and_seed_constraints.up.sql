CREATE UNIQUE INDEX IF NOT EXISTS uq_content_modules_pillar_title
  ON content_modules(pillar, title);

CREATE UNIQUE INDEX IF NOT EXISTS uq_mapping_rules_pillar_range_content
  ON mapping_rules(pillar, min_score, max_score, content_id);

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  admin_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id BIGINT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at
  ON admin_audit_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_user
  ON admin_audit_logs(admin_user_id, created_at DESC);
