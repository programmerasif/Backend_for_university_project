import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const creatAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);
  return result;
};

const getAllAcademicFacultiesIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultiesIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updatedAcademicFacultiesIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  return result;
};
export const AcademicFacultyServices = {
  creatAcademicFacultyIntoDB,
  getAllAcademicFacultiesIntoDB,
  getSingleAcademicFacultiesIntoDB,
  updatedAcademicFacultiesIntoDB,
};
