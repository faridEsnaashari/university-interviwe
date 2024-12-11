import { z } from 'zod';

export const managerLoginDtoSchema = z
  .object({
    nationalCode: z.string().min(3),
    password: z.string().min(3),
  })
  .required();

export type ManagerLoginDto = Required<z.infer<typeof managerLoginDtoSchema>>;
