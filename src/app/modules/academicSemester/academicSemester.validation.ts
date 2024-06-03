import { z } from 'zod';
import {  AcademicSchemaCode, AcademicSchemaName, Month } from './academicSemester.constance';

const creatAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSchemaName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSchemaCode] as [string, ...string[]]),
    startMonth:z.enum([...Month] as [string, ...string[]]),
    endMonth:z.enum([...Month] as [string, ...string[]]),

  })
});

export const AcademicSamisterValidation = {
   creatAcademicSemisterValidationSchema,
};