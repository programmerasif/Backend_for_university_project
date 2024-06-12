import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { AcademicDepertmentServices } from './academicDepertment.service';

const creatAcademicDeprtment = catchAsync(async (req, res) => {
  

  const result = await AcademicDepertmentServices.creatAcademicDepertmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty is creat succesfully',
    data: result,
  });
});

const getAllAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepertmentServices.getAllAcademicdepertmentsIntoDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get All Academic Depertment succesfully',
    data: result,
  });
});

const getSingleAcademicDepertment = catchAsync(async (req, res) => {
  const { depertmentId } = req.params;
  const result =
    await AcademicDepertmentServices.getSingleAcademicDepertmentsIntoDB(
      depertmentId,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Single Academic Depertment succesfully',
    data: result,
  });
});

const updateAcademicDepertment = catchAsync(async (req, res) => {
  const { depertmentId } = req.params;
  
  const result =
    await AcademicDepertmentServices.updatedAcademicDepertmentsIntoDB(
      depertmentId,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Academic Depertment succesfully',
    data: result,
  });
});

export const accademicDepertmentControlers = {
  creatAcademicDeprtment,
  getAllAcademicDepertment,
  getSingleAcademicDepertment,
  updateAcademicDepertment,
};
