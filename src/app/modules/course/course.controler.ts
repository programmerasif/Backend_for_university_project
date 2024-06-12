// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import { AcademicFacultyServices } from "./academicFaculty.service";

import httpStatus from 'http-status';
import QueryBuilders from '../../builders/QueryBuilders';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const creatCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.creatCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is creat succesfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get All Courses succesfully',
    data: result,
  });
});

const getSinglCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Single course succesfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted course succesfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Course succesfully',
    data: result,
  });
});

const assignCourseFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCoursIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted course succesfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  succesfully',
    data: result,
  });
});

export const courseControlers = {
  creatCourse,
  getAllCourse,
  getSinglCourse,
  deleteCourse,
  updateCourse,
  assignCourseFacultiesWithCourse,
  removeFacultiesFromCourse,
};
