import { Schema, model } from 'mongoose';
import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSchemaCode, AcademicSchemaName, Month } from './academicSemester.constance';



const academicSemisterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum:AcademicSchemaName
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum:AcademicSchemaCode
  },
  startMonth:{
    type: String,
    required:true,
    enum: Month,
  },
  endMonth: {
    type: String,
    required:true,
    enum: Month,
  },
});

academicSemisterSchema.pre('save', async function(next){

  const isSemisterExists = await AcademicSemister.findOne({
    year:this.year,
    name:this.name
  })
  if (isSemisterExists) {
    throw new Error('Semister is alrady exist')
  }
  next()
})

export const AcademicSemister = model<TAcademicSemester>("AcademicSemister",academicSemisterSchema)