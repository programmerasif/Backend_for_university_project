import { Student } from './student.model';

const getAllStudentIntoDB = async () => {
  const result = await Student.find();
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentServicess = {
  getAllStudentIntoDB,
  deleteStudentFromDB
};
