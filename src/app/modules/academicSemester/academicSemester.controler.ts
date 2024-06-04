import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemisterServices } from './academicSemester.services';

// creat Academic Semister
const creatAcademicSemister = catchAsync(async (req, res) => {
  //  here we call the services function
  const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semister is creat succesfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async(req,res) =>{

  const result =  await AcademicSemisterServices.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Succesfully get all Academic Semister',
    data: result,
  });
})

const getSingleAcademicSemester = catchAsync(async(req,res) => {
  const id = req.params.semesterId
const result = await AcademicSemisterServices.getSingleAcademicSemesterFromDB(id)
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: 'Succesfully get single Academic Semister by ID',
  data: result,
});
})

const updateAcademicSemester = catchAsync(async(req,res) => {
  const id = req.params.semesterId
const result = await AcademicSemisterServices.updateAcademicSemesterIntoDB(id,req.body)
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: 'Succesfully get single Academic Semister by ID',
  data: result,
});
})

export const AcademicSemisterControlers = {
  creatStudent: creatAcademicSemister,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester
};
