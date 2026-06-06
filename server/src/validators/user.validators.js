import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8),
  role: z.enum(['customer', 'employee', 'admin']).default('customer'),
  pin: z.string().regex(/^\d{4,6}$/).optional()
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().toLowerCase().optional(),
  role: z.enum(['customer', 'employee', 'admin']).optional()
});
