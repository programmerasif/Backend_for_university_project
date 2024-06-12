import { TAcademicDeprtment } from './academicDepertment.interface';
import { AcademicDeprtment } from './academicDepertment.model';

const creatAcademicDepertmentIntoDB = async (payLoad: TAcademicDeprtment) => {
  const result = await AcademicDeprtment.create(payLoad);
  return result;
};

const getAllAcademicdepertmentsIntoDB = async () => {
  const result = await AcademicDeprtment.find().populate("academicFaculty");
  return result;
};
const getSingleAcademicDepertmentsIntoDB = async (id: string) => {
  const result = await AcademicDeprtment.findById(id).populate("academicFaculty");
  return result;
};

const updatedAcademicDepertmentsIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDeprtment>,
) => {

  const result = await AcademicDeprtment.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepertmentServices = {
  creatAcademicDepertmentIntoDB,
  getAllAcademicdepertmentsIntoDB,
  getSingleAcademicDepertmentsIntoDB,
  updatedAcademicDepertmentsIntoDB,
};
