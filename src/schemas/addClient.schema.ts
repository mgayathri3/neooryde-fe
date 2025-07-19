import { z } from 'zod';
import { AccountType } from '../types/auth';

export const clientSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(AccountType, {
    required_error: 'Please select account type',
  }),
  isActive: z.boolean(),
});

export type AddClientFormData = z.infer<typeof clientSchema>;
