import { studentServicess } from './student.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// find student
const getAllStudent = catchAsync(async (req, res) => {
  const  query = req.query
  const result = await studentServicess.getAllStudentIntoDB(query);
  // here I am sending response to user
  res.status(200).json({
    success: true,
    message: 'Get all student  successfully',
    data: result,
  });
});

// delete student
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServicess.deleteStudentFromDB(id);

  res.status(200).json({
    success: true,
    message: 'student delete succesfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServicess.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServicess.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

export const studentControlars = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
  updateStudent
};
