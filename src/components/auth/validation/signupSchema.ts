
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string().min(2, { message: 'Full name is required' }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
