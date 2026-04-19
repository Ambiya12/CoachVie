-- Migration 003: Remove diagnostic, plan, and content tables
-- These features are replaced by the new dashboard (Penser/Conscience system)

DROP TABLE IF EXISTS plan_items;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS mapping_rules;
DROP TABLE IF EXISTS profile_scores;
DROP TABLE IF EXISTS diagnostic_responses;
DROP TABLE IF EXISTS diagnostic_sessions;
DROP TABLE IF EXISTS content_modules;
