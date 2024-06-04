import config from '../../config';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.moduel';
import { generatedStudentId } from './user.utils';

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
  // set generated id
  userData.id = await generatedStudentId(admissionSemister);

  // creat a stuent
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    (payload.id = newUser.id), (payload.user = newUser._id);
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  creatStudentIntoDB,
};
