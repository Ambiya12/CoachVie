import { z } from 'zod';

export const auditLogQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
