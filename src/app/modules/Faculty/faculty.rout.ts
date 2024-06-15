import express from 'express';
// import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import valideteRequest from '../../middlewars/valideteRequest';
import { FacultyControllers } from './faculty.controler';
import auth from '../../middlewars/authValidation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  valideteRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/',auth() ,FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;