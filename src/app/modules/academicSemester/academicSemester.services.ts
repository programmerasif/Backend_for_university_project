import { academicSemesterNameCodeMapper } from './academicSemester.constance';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemister } from './academicSemester.model';

const createAcademicSemisterIntoDB = async (payLoad: TAcademicSemester) => {
  console.log(payLoad.name);
  console.log(academicSemesterNameCodeMapper[payLoad.name]);
  if (academicSemesterNameCodeMapper[payLoad.name] != payLoad.code) {
    throw new Error('Invalid Semister Code');
  }

  const result = await AcademicSemister.create(payLoad);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
