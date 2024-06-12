import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/appError';
import { User } from '../user/user.moduel';
import { TStudent } from './student.interface';
import QueryBuilders from '../../builders/QueryBuilders';
import { studentSearchableFields } from './student.constand';

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object

  // let searchTerm = ''; // SET DEFAULT VALUE

  // // IF searchTerm  IS GIVEN SET IT
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // //  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  // //   { email: { $regex : query.searchTerm , $options: i}}
  // //   { presentAddress: { $regex : query.searchTerm , $options: i}}
  // //   { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  // const studentSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'permanentAddress',
  // ];
  // // WE ARE DYNAMICALLY DOING IT USING LOOP
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // FILTERING fUNCTIONALITY:

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach(el => delete queryObj[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissinoSemister')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // // SORTING FUNCTIONALITY:

  // let sort = '-createdAt'; // SET DEFAULT VALUE

  // // IF sort  IS GIVEN SET IT

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1
  // let limit = 1
  // let skip = 0

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page-1)*limit
  // }

  // const pgeinationQuery = sortQuery.skip(skip)

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }

  // const limitQuery = await pgeinationQuery.limit(limit)
  // // const result = await Student.find()
  // //   .populate({
  // //     path: 'academicDepartment',
  // //     populate: {
  // //       path: 'academicFaculty',
  // //     },
  // //   })
  // //   .populate('admissinoSemister');
  // return limitQuery;

  const studentQuery = new QueryBuilders(
    Student.find()
      .populate('admissinoSemister')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginte()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id )
    .populate('admissinoSemister')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(400, 'faild to delet student');
    }
    const userId = deletedStudent.user
    const deletedUser = await User.findByIdAndUpdate(
      userId ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGardian && Object.keys(localGardian).length) {
    for (const [key, value] of Object.entries(localGardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const studentServicess = {
  getAllStudentIntoDB,
  deleteStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
};
