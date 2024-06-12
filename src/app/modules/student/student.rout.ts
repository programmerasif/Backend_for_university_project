import express from 'express';
import { studentControlars } from './student.controlar';
import valideteRequest from '../../middlewars/valideteRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call the controlar function
// router.post('/create-student', studentControlars.creatStudent);
router.get('/', studentControlars.getAllStudent);
router.delete('/:id', studentControlars.deleteStudent);
router.get('/:id', studentControlars.getSingleStudent);

router.patch(
  '/:id',
  valideteRequest(updateStudentValidationSchema),
  studentControlars.updateStudent,
);
export const studentRoutes = router;
