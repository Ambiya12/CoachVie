import type { Pillar } from './domain';

export interface AdminContentInput {
  pillar: Pillar;
  title: string;
  description: string;
  durationMinutes: number;
  externalLink: string | null;
}

export interface AdminContentRecord extends AdminContentInput {
  id: number;
  isActive: boolean;
}

export interface MappingRuleRecord {
  id: number;
  pillar: Pillar;
  minScore: number;
  maxScore: number;
  contentId: number;
  priority: number;
  isActive: boolean;
}

export interface MappingRuleUpdateInput {
  minScore: number;
  maxScore: number;
  contentId: number;
  priority: number;
  isActive: boolean;
}

export interface AdminAuditLogRecord {
  id: number;
  adminUserId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  metadata: unknown;
  createdAt: string;
}
