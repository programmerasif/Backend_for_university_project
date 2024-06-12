// import httpStatus from 'http-status';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';
// import { Course } from '../Course/course.model';
// import { Faculty } from '../Faculty/faculty.model';
// import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
// import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
// import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
// import { TOfferedCourse } from './OfferedCourse.interface';
// import { OfferedCourse } from './OfferedCourse.model';
// import { hasTimeConflict } from './OfferedCourse.utils';

import httpStatus from 'http-status';
import { TOfferedCourse } from './offeredCourse.interface';
import AppError from '../../errors/appError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from '../semisterRegistration/semisterRegistration.model';
import { Course } from '../course/course.model';
import { AcademicDeprtment } from '../academicDepertment/academicDepertment.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
  // step one
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      ' semister registration is not found ',
    );
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  // step two
  const isacademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isacademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, ' Academic Faculty is not found ');
  }
  // step three
  const isAcademicDepartmentExist =
    await AcademicDeprtment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      ' Academic Depertment is not found ',
    );
  }
  // step four
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, ' Course is not found ');
  }
  // step five
  const isfacultyExist = await Faculty.findById(faculty);
  if (!isfacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, ' Faculty is not found ');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
};
const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
