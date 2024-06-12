import express from 'express';
import { AdminControllers } from './admin.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  valideteRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;