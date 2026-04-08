import { z } from 'zod';

export const dayItemsParamsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const updatePlanItemStatusParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updatePlanItemStatusBodySchema = z.object({
  status: z.enum(['todo', 'done']),
});
