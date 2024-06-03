import { Router } from 'express';
import { AcademicSemisterControlers } from './academicSemester.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { AcademicSamisterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/creat-accademic-semister',
  valideteRequest(AcademicSamisterValidation.creatAcademicSemisterValidationSchema),
  AcademicSemisterControlers.creatStudent,
);

router.get('/',AcademicSemisterControlers.getAllAcademicSemesters)

export const AcademicSemisterRout = router;
