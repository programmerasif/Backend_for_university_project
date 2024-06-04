import { Schema, model, connect, Types, Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  password: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencycontactNo: string;
  bloodGroup?: 'a+' | 'a-' | 'b+' | 'b-' | 'ab+' | 'ab-' | 'o+' | 'o-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGardian: TLocalGardian;
  profileImg: string;
  admissinoSemister: Types.ObjectId;
  isDeleted: boolean;
};

// for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
