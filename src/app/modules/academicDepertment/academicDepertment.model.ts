import { Schema, model } from 'mongoose';
import { TAcademicDeprtment } from './academicDepertment.interface';
import AppError from '../../errors/appError';

export const academicDeprtmentSchema = new Schema<TAcademicDeprtment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);




academicDeprtmentSchema.pre('save', async function (next) {
  const isSemisterExists = await AcademicDeprtment.findOne({
    name: this.name,
  });
  if (isSemisterExists) {
    throw new AppError(404,'This department already exists');
  }
  next()
});


academicDeprtmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDeprtment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(404,'This department does not exist!');
  }

  next();
});


export const AcademicDeprtment = model<TAcademicDeprtment>(
  'AcademicDeprtment',
  academicDeprtmentSchema,
);
