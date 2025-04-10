import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
