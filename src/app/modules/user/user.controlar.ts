import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// creat student
const creatStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  //  here we call the services function
  const result = await UserServices.creatStudentIntoDB(password, student);

  // here I am sending response to user
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is creat succesfully',
    data: result,
  });
});

export const UsersControlers = {
  creatStudent,
};
