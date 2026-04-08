import { z } from 'zod';

export const pillarParamsSchema = z.object({
  pillar: z.enum(['nutrition', 'sport', 'mind']),
});

export const contentIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
