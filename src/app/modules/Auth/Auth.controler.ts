import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.service';


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is retrieved succesfully',
        data: result,
      });
});

const changePassword = catchAsync(async (req, res) => {
  const {...passwordData} = req.body
  const user = req.user
  const result = await AuthServices.changePassword(req.user,passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change  succesfully',
    data: result,
  });
});



export const AuthControllers = {
  loginUser,
  changePassword,
};