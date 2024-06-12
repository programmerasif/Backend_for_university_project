import mongoose from 'mongoose';
import QueryBuilders from '../../builders/QueryBuilders';
import { CourseSearchableFields } from './course.const';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const creatCourseIntoDB = async (patLoad: TCourse) => {
  const result = await Course.create(patLoad);
  return result;
};
const getAllCourseIntoDB = async (query: Record<string, any>) => {
  const courseQuery = new QueryBuilders(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginte()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseIntoDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payLoad: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payLoad;

  //   using trangation and roleback
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaining,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Faild to Update Basic Information',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      //   filter out the delete filds
      const deletedPreRequisites = preRequisiteCourses
        .filter(el => el.course && el.isDeleted == true)
        .map(el => el.course);

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisites },
            },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisitesCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Faild Deleted PreRequisites Courses',
        );
      }
      //   filter out the new filds

      const newPreRequisites = preRequisiteCourses.filter(
        el => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisitesCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Faild Added New PreRequisites Courses',
        );
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
      return result;
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild Added New Courses');
  } finally {
    await session.endSession();
  }
};

const assignFacultiesWithCoursIntoDB = async (
  id: string,
  payLoad: Partial<TCoursefaculty>,
) => {

    const resul = await CourseFaculty.findByIdAndUpdate(
        id,
        {   
            course:id,
            $addToSet: {faculties : {$each: payLoad}}
        },
        {
            upsert:true
        }
    )
};

const removeFacultiesFromCourseFromDB = async (
    id: string,
    payload: Partial<TCoursefaculty>,
  ) => {
    const result = await CourseFaculty.findByIdAndUpdate(
      id,
      {
        $pull: { faculties: { $in: payload } },
      },
      {
        new: true,
      },
    );
    return result;
  };
export const CourseServices = {
  creatCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCoursIntoDB,
  removeFacultiesFromCourseFromDB
};
