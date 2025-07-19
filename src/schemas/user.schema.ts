import { z } from 'zod';
import { AccountType, Roles } from '../types/auth';

export const userSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: z
      .string()
      .trim()
      .min(3, 'Email must be at least 3 characters')
      .max(50, 'Email must not exceed 50 characters')
      .email({ message: 'Please enter a valid email address' }),
    phone: z
      .string()
      .length(10, 'Phone number must be exactly 10 digits')
      .regex(/^\d+$/, 'Phone number must contain only digits'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must not exceed 50 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain one special character',
      ),
    userAccountType: z.nativeEnum(AccountType, {
      required_error: 'Please select a user type',
    }),
    role: z.nativeEnum(Roles, {
      required_error: 'Please select a user role',
    }),
    orgId: z.union([z.number(), z.undefined()]),
  })
  .superRefine((data, ctx) => {
    if (data.userAccountType !== AccountType.NEURYDE && !data.orgId) {
      ctx.addIssue({
        path: ['orgId'],
        code: z.ZodIssueCode.custom,
        message: 'Organization is required for this user type',
      });
    }
  });

export type RegisterUserFormData = z.infer<typeof userSchema>;
