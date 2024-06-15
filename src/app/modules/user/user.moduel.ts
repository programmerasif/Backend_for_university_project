import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import { date } from "zod";

const userSchema = new Schema<TUser, UserModel>(
    {
      id: {
        type: String,
        required: true,
        unique:true
      },
      password: {
        type: String,
        required: true,
      },
      passwordChangedAt: {
        type: Date
      },
      needsPasswordChange: {
        type: Boolean,
        default: true,
      },
      role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
      },
      status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );



  userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(12),
    );
    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  
  userSchema.statics.isUserExistsByCustomId = async function (
    id: string,
  ): Promise<TUser | null> {
    console.log(id);
    
    return await User.findOne({ id })
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPass: string,hasPass: string
  ): Promise<TUser | null | boolean> {
    
   return await bcrypt.compare(plainTextPass,hasPass)
  };
  

  export const User = model<TUser,UserModel>('User', userSchema);