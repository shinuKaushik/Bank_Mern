import { z } from 'zod';

export const amountSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0')
});

export const withdrawSchema = amountSchema.extend({
  pin: z.string().min(1, 'PIN is required')
});

export const transferSchema = withdrawSchema.extend({
  receiverAccount: z.string().trim().min(6, 'Receiver account number is required')
});
