import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  pin: z.string().regex(/^\d{4,6}$/, 'PIN must be 4 to 6 digits')
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1, 'Password is required')
});
