import { Schema, model, connect } from 'mongoose';
import {
  TGuardian,
  TStudent,
  TLocalGardian,
  TUserName,
  StudentModel,
} from './student.interface';

const userNameSchema = new Schema<TUserName,StudentModel>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGardianSchema = new Schema<TLocalGardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studenSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencycontactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup:  {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  permanentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian:  {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGardian: {
    type: localGardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: {
    type: String,
  },
  admissinoSemister: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemister'
  }
  ,
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON: {
    virtuals: true,
  },
}
);

// virtual
studenSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query Middleware
studenSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studenSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studenSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studenSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent,StudentModel>('Student', studenSchema);
