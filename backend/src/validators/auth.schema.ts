import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Password must include one uppercase letter')
    .regex(/[0-9]/, 'Password must include one number'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
