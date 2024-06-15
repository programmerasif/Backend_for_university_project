import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.moduel';
import { generateAdminId, generateFacultyId } from './user.utils';
import AppError from '../../errors/appError';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDeprtment } from '../academicDepertment/academicDepertment.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import httpStatus from 'http-status';
import { Admin } from '../Admin/admin.model';

const creatStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  //  if pass is not given ,use default pass
  userData.password = password || (config.default_pass as string);

  // student role
  userData.role = 'student';
  // find accademic semister information
  const admissionSemister = await AcademicSemister.findById(
    payload.admissinoSemister,
  );
  if (!admissionSemister) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generatedStudentId(admissionSemister);

    // creat a user(transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(500, 'creat user faild');
    }
    if (newUser.length) {
      (payload.id = newUser[0].id), (payload.user = newUser[0]._id);
      //  creat student (transaction-1)
      const newStudent = await Student.create([payload], { session });

      if (!newStudent) {
        throw new AppError(500, 'creat student faild');
      }

      await session.commitTransaction();
      return newStudent;
    }
  } catch (error) {
    session.abortTransaction();
    throw new Error('Failed to create student');
  } finally {
    session.endSession();
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDeprtment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(500, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = {
  creatStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
