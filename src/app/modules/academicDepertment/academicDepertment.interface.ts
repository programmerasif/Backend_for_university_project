import { Types } from "mongoose"

export type TAcademicDeprtment = {
    name: string,
    academicFaculty: Types.ObjectId;
}