import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TUserRole } from '../modules/user/user.interface';
const auth = (...requerdRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const authorization = req.headers.authorization
   const token = authorization;

   if (!token ) {
    throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
   }
//    if (token !== config.JWT_ACCESS_SECRATE) {
//     throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
//    }

jwt.verify(token,config.JWT_ACCESS_SECRATE as string, function(err, decoded) {
    if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
    }

    const role = (decoded as JwtPayload).role
   if (requerdRoles && !requerdRoles.includes(role)) {
    throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
   }
    req.user = decoded as JwtPayload
  });
   next()
  })
};
export default auth;
