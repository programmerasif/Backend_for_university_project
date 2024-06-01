import { UserServices } from "./user.service";
import { Request, Response } from 'express';
// creat student 
const creatStudent = async (req: Request, res: Response) => {
    try {
      const {password,student} = req.body;
      //  here we call the services function
      const result = await UserServices.creatStudentIntoDB(password,student);
  
      // here I am sending response to user
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message || 'Unknown error occurred';
      // sending error response
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the student',
        error: errorMessage,
      });
    }
  };

  export const UsersControlers = {
    creatStudent
  }