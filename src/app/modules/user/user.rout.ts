import express from 'express';
import { UsersControlers } from './user.controlar';
import { creatStudentValidationSchema } from '../student/student.validation';
import valideteRequest from '../../middlewars/valideteRequest';
const rout = express.Router();

rout.post(
  '/creat-student',
  valideteRequest(creatStudentValidationSchema),
  UsersControlers.creatStudent,
);
export const UserRoutes = rout;
