import { z } from 'zod';

export const createContentSchema = z.object({
  pillar: z.enum(['nutrition', 'sport', 'mind']),
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  durationMinutes: z.number().int().positive().max(240),
  externalLink: z.string().url().nullable(),
});

export const contentIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateContentActivationSchema = z.object({
  isActive: z.boolean(),
});

export const mappingRuleIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateMappingRuleSchema = z.object({
  minScore: z.number().int().min(0).max(100),
  maxScore: z.number().int().min(0).max(100),
  contentId: z.number().int().positive(),
  priority: z.number().int().positive().max(100),
  isActive: z.boolean(),
});

export const auditLogQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
