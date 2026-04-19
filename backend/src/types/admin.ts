export interface AdminAuditLogRecord {
  id: number;
  adminUserId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  metadata: unknown;
  createdAt: string;
}
