import express from 'express';
import valideteRequest from '../../middlewars/valideteRequest';
import { AuthValidation } from './Auth.validation';
import { AuthControllers } from './Auth.controler';
import { USER_ROLE } from '../user/user.const';
import auth from '../../middlewars/authValidation';


const router = express.Router();

router.post(
  '/login',
  valideteRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  valideteRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;