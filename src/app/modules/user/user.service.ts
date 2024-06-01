import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.moduel';

const creatStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  //  if pass is not given ,use default pass
  userData.password = password || (config.default_pass as string);

  // student role
  userData.role = 'student';
  // manually generated id
  userData.id = '2002120212';
  // creat a stuent
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    (studentData.id = newUser.id), 
    (studentData.user = newUser._id);
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  creatStudentIntoDB,
};
