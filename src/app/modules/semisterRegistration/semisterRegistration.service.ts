import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semisterRegistration.interface';
import { SemesterRegistration } from './semisterRegistration.model';
import QueryBuilders from '../../builders/QueryBuilders';
import { RegistrationStatus } from './semisterRegistration.const';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // if there any semester registered that is already UPCOMMING  or ONGOING admine can not register new semister
  const isThereAnyUpcommingOrOngoingSemister =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcommingOrOngoingSemister) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already ${isThereAnyUpcommingOrOngoingSemister?.status} register semister!`,
    );
  }
  //chack if the semister is exist or not
  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExist =
    await AcademicSemister.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this academic semister not found',
    );
  }
  const isSemisterRegestrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  });

  if (isSemisterRegestrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'this semister is alrady registered',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, any>,
) => {
  const semesterRegistrationQuery = new QueryBuilders(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginte()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the semister is exist or not
  const isAcademicSemesterExist = await SemesterRegistration.findById(id);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this academic semister not found',
    );
  }
  // if the semister is ended we do not give acces to update status
  const currentSemisterStatus = isAcademicSemesterExist.status;
  // here we are chack the status of the smister is end or not
  if (currentSemisterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semister is alridy ${currentSemisterStatus}`,
    );
  }

  // UPCOMING => ONGOING => ENDED
  const requestedStatus = payload?.status;
  if (currentSemisterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change status from ${currentSemisterStatus} to ${requestedStatus}`,
    );
  }
  if (currentSemisterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change status from ${currentSemisterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result
};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
