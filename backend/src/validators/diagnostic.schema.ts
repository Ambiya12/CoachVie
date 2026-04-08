import { z } from 'zod';

export const startDiagnosticSchema = z.object({});

export const diagnosticStepParamsSchema = z.object({
  stepNumber: z.coerce.number().int().min(1).max(3),
});

export const diagnosticStepBodySchema = z.object({
  sessionId: z.number().int().positive(),
  answers: z
    .array(
      z.object({
        questionCode: z.string().min(2).max(12),
        value: z.number().int().min(1).max(5),
      }),
    )
    .min(1),
});

export const submitDiagnosticSchema = z.object({
  sessionId: z.number().int().positive(),
});
