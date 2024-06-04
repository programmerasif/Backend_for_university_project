import { studentServicess } from './student.services';
import catchAsync from '../../utils/catchAsync';

// find student
const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServicess.getAllStudentIntoDB();
  // here I am sending response to user
  res.status(200).json({
    success: true,
    message: 'Get all student  successfully',
    data: result,
  });
});

// delete student
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServicess.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'student delete succesfully',
    data: result,
  });
});
export const studentControlars = {
  getAllStudent,
  deleteStudent,
};
