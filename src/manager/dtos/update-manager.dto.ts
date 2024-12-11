import { z } from 'zod';

export const updateManagerDtoSchema = z.object({
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  phone: z.string().min(3).optional(),
  nationalCode: z.string().min(3).optional(),
  birthOfDate: z.string().date().optional(),
  fatherName: z.string().min(3).optional(),
  gender: z.literal('MALE').or(z.literal('FEMALE')).optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export type UpdateManagerDto = z.infer<typeof updateManagerDtoSchema>;
