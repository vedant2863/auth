import { z } from 'zod';

// Register form validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        return !isNaN(date.getTime()) && date < today;
      },
      { message: 'Date of birth must be a valid date in the past' }
    ),
  email: z
    .string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
});

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
