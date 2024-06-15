import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.moduel';
import { TLoginUser } from './Auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';



const loginUser = async (payLoad: TLoginUser) => {
  // here we are chacking the user id from data base
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payLoad.id);

  console.log(await User.isUserExistsByCustomId(payLoad.id));

  if (!(await User.isUserExistsByCustomId(payLoad.id))) {
    throw new AppError(httpStatus.NOT_FOUND, `This users is not found`);
  }

  // chacking  if the user is alrady delete or not
  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, `This users is Deleted`);
  }

  // chacking  if the user is alrady delete or not
  const userSrtatus = user?.status;
  if (userSrtatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, `This users is Blocked`);
  }

  //checking if the password is correct

  if (
    !(await User.isPasswordMatched(payLoad?.password, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accesToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRATE as string, {
    expiresIn: 60 * 60,
  });


  return {
    needsPasswordChange:user?.needsPasswordChange,
    accesToken
  }
};


// hange password
const changePassword = async (userData:JwtPayload,payLoad:{oldPasword:string,newPassword:string}) => {
  const user = await User.isUserExistsByCustomId(userData.id);


  if (!(await User.isUserExistsByCustomId(userData.userId))) {
    throw new AppError(httpStatus.NOT_FOUND, `This users is not found`);
  }

  // chacking  if the user is alrady delete or not
  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, `This users is Deleted`);
  }

  // chacking  if the user is alrady delete or not
  const userSrtatus = user?.status;
  if (userSrtatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, `This users is Blocked`);
  }


  //checking if the password is correct

  if (
    !(await User.isPasswordMatched(payLoad?.oldPasword, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

   //hash new password
 const newHashedPassword = await bcrypt.hash(
  payLoad.newPassword,
  Number(12),
);


await User.findOneAndUpdate(
  {
    id: userData.userId,
    role: userData.role,
  },
  {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  },
);

return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
