import { Op } from 'sequelize';
import { z } from 'zod';

export const findAllTeacherDtoSchema = z.preprocess(
  (value) => JSON.parse(JSON.stringify(value)),
  z
    .object({
      firstName: z
        .string()
        .min(3)
        .optional()
        .transform((val) => val && { [Op.like as symbol]: `%${val}%` }),

      lastName: z
        .string()
        .min(3)
        .optional()
        .transform((val) => val && { [Op.like as symbol]: `%${val}%` }),

      phone: z
        .string()
        .min(3)
        .optional()
        .transform((val) => val && { [Op.like as symbol]: `%${val}%` }),

      nationalCode: z
        .string()
        .min(3)
        .optional()
        .transform((val) => val && { [Op.like as symbol]: `%${val}%` }),

      birthOfDate: z.string().date().optional(),

      fatherName: z
        .string()
        .min(3)
        .optional()
        .transform((val) => val && { [Op.like as symbol]: `%${val}%` }),

      gender: z.literal('MALE').or(z.literal('FEMALE')).optional(),

      page: z
        .string()
        .optional()
        .transform((val) => val && +val),

      limit: z
        .string()
        .optional()
        .transform((val) => val && +val),
    })
    .transform((value) => ({ page: 1, limit: 10, ...value })),
);

export type FindAllTeacherDto = z.infer<typeof findAllTeacherDtoSchema>;
