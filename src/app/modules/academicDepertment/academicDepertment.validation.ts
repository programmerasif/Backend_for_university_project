import { z } from "zod";

const creatAcademicDeprtmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic name validation musb be string ',
            required_error: "Academic Deprtment name is needed"
          }),
        academicFaculty: z.string({
        invalid_type_error: 'Academic Deprtment validation musb be string ',
        required_error: "Academic Deprtment Faculty id is needed"
      }),
    }),
  });
  
  const updateAcademicDeprtmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic name validation musb be string ',
          }).optional(),
        academicFaculty: z.string({
        invalid_type_error: 'Academic Deprtment validation musb be string ',
      }).optional(),
    }),
  });
  export const AcademicDeprtmentValidations = {
    creatAcademicDeprtmentValidationSchema,
    updateAcademicDeprtmentValidationSchema,
  };
  