import { academicSemesterNameCodeMapper } from './academicSemester.constance';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemister } from './academicSemester.model';

const createAcademicSemisterIntoDB = async (payLoad: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Invalid Semister Code');
  }
  const result = await AcademicSemister.create(payLoad);
  return result;
};

const getAllAcademicSemestersFromDB = async () =>{
const result = await AcademicSemister.find()
return result
}
export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemestersFromDB
};
