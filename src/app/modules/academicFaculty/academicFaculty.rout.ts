import express from 'express';
import { accademicfacultyControlers } from './academicFaculty.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { AcademicFacultyValidations} from './academicFaculty.Valodation';

const rout = express.Router();

rout.post(
  '/creat-academic-faculty',
  valideteRequest(AcademicFacultyValidations.creatAcademicFacultyValidationSchema),
  accademicfacultyControlers.creatAcademicFaculty,
);
rout.get(
  '/',
  accademicfacultyControlers.getAllAcademicFaculty,
);
rout.get(
  '/:facultyId',
  accademicfacultyControlers.getSingleAcademicFaculty,
);
rout.patch(
  '/:facultyId',
  valideteRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema),
  accademicfacultyControlers.updateAcademicFaculty,
);
export const AcademicFacultyRout = rout