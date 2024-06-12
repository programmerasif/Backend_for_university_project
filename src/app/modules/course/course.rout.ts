import express from 'express';
import { courseControlers } from './course.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { CourseValidations } from './course.validation';
// import { accademicfacultyControlers } from './academicFaculty.controler';
// import valideteRequest from '../../middlewars/valideteRequest';
// import { AcademicFacultyValidations} from './academicFaculty.Valodation';

const rout = express.Router();

rout.post(
  '/creat-course',
  valideteRequest(CourseValidations.createCourseValidationSchema),
  courseControlers.creatCourse,
);
rout.get('/', courseControlers.getAllCourse);
rout.get('/:id', courseControlers.getSinglCourse);
rout.delete('/:id', courseControlers.deleteCourse);
rout.patch(
  '/:id',
  valideteRequest(CourseValidations.updateCourseValidationSchema),
  courseControlers.updateCourse,
);
rout.put(
  '/:courseId/assign-facalty',
  valideteRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControlers.assignCourseFacultiesWithCourse,
);
rout.delete(
  '/:courseId/remove-faculties',
  valideteRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControlers.removeFacultiesFromCourse,
);
export const CourseRoutes = rout;
