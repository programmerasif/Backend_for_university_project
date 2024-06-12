import express from 'express';
import { UsersControlers } from './user.controlar';
import { creatStudentValidationSchema } from '../student/student.validation';
import valideteRequest from '../../middlewars/valideteRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
const rout = express.Router();

rout.post(
  '/creat-student',
  valideteRequest(creatStudentValidationSchema),
  UsersControlers.creatStudent,
);
rout.post(
  '/create-faculty',
  valideteRequest(createFacultyValidationSchema),
  UsersControlers.createFaculty,
);
export const UserRoutes = rout;
