import { Router } from 'express';
import { AcademicSemisterControlers } from './academicSemester.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { AcademicSamisterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/creat-accademic-semister',
  valideteRequest(
    AcademicSamisterValidation.creatAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControlers.creatAcademicSemister,
);

router.get('/', AcademicSemisterControlers.getAllAcademicSemesters);

router.get(
  '/:semesterId',
  AcademicSemisterControlers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  valideteRequest(
    AcademicSamisterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemisterControlers.updateAcademicSemester,
);
export const AcademicSemisterRout = router;

