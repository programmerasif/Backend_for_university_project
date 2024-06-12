import express from 'express';
import valideteRequest from '../../middlewars/valideteRequest';
import { accademicDepertmentControlers } from './academicDepertment.controler';
import { AcademicDeprtmentValidations } from './academicDepertment.validation';



const rout = express.Router();

rout.post(
  '/creat-academic-depertment',
  valideteRequest(AcademicDeprtmentValidations.creatAcademicDeprtmentValidationSchema),
  accademicDepertmentControlers.creatAcademicDeprtment
);
rout.get(
  '/',
  accademicDepertmentControlers.getAllAcademicDepertment
);
rout.get(
  '/:depertmentId',
  accademicDepertmentControlers.getSingleAcademicDepertment
);
rout.patch(
  '/:depertmentId',
  valideteRequest(AcademicDeprtmentValidations.updateAcademicDeprtmentValidationSchema),
  accademicDepertmentControlers.updateAcademicDepertment
);
export const AcademicDepertmentsRout = rout