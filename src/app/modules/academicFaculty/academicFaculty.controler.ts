import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const creatAcademicFaculty = catchAsync(async(req,res) =>{
    const result = await AcademicFacultyServices.creatAcademicFacultyIntoDB(req.body)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Academic Faculty is creat succesfully',
        data: result,
      })
})

const getAllAcademicFaculty = catchAsync(async(req,res) =>{
    const result = await AcademicFacultyServices.getAllAcademicFacultiesIntoDB()

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Get All Academic Faculty succesfully',
        data: result,
      })
})

const getSingleAcademicFaculty = catchAsync(async(req,res) =>{
    const { facultyId} = req.params
    const result = await AcademicFacultyServices.getSingleAcademicFacultiesIntoDB(facultyId)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Get Single Academic Faculty succesfully',
        data: result,
      })
})

const updateAcademicFaculty = catchAsync(async(req,res) =>{
    const {facultyId} = req.params
    const result = await AcademicFacultyServices.updatedAcademicFacultiesIntoDB(facultyId,req.body)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Update Academic Faculty succesfully',
        data: result,
      })
})

export const accademicfacultyControlers = {
    creatAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}