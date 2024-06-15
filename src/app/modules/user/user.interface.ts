import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

// export type TUser = {
//   id: string;
//   password: string;
//   needsPasswordChange: boolean;
//   role: 'admin' | 'student' | 'faculty';
//   status: 'in-progress' | 'blocked';
//   isDeleted: boolean;
// };

export type NewUser = {
  password: string;
  role: string;
  id: string;
};

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPass: string,hasPass: string): Promise<TUser | boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;