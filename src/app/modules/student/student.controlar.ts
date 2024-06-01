import { Request, Response } from 'express';
import { studentServicess } from './student.services';



// find student 
const getAllStudent = async(req: Request, res:Response) =>{
try {
  const result = await studentServicess.getAllStudentIntoDB()
// here I am sending response to user
res.status(200).json({
  success: true,
  message: 'Get all student  successfully',
  data: result,
});
} catch (error) {
  console.log(error);
  const errorMessage = (error as Error).message || 'Unknown error occurred';
  // sending error response
  res.status(500).json({
    success: false,
    message: 'An error occurred while get all student the student',
    error: errorMessage,
  });
}
}

// delete student 
const deleteStudent = async (
  req: Request,
  res: Response,
 
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServicess.deleteStudentFromDB(studentId);

   res.status(200).json({
    success: true,
    message: "student delete succesfully",
    data: result
   })
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: "student delete succesfully",
      error: err.message || "somthing went worng"
     })
  }
};
export const studentControlars = {
  getAllStudent,
  deleteStudent
};
