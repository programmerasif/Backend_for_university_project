import express from 'express';
import { UsersControlers } from './user.controlar';
import { creatStudentValidationSchema } from '../student/student.validation';
import valideteRequest from '../../middlewars/valideteRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewars/authValidation';
import { USER_ROLE } from './user.const';
const rout = express.Router();

rout.post(
  '/creat-student',
  auth(USER_ROLE.admin),
  valideteRequest(creatStudentValidationSchema),
  UsersControlers.creatStudent,
);
rout.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  valideteRequest(createFacultyValidationSchema),
  UsersControlers.createFaculty,
);
rout.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  valideteRequest(createAdminValidationSchema),
  UsersControlers.createAdmin,
);
export const UserRoutes = rout;
