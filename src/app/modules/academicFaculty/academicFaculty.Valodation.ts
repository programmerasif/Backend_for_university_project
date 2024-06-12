import { z } from 'zod';

const creatAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic name validation musb be string ',
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic name validation musb be string ',
    }),
  }),
});
export const AcademicFacultyValidations = {
  creatAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
