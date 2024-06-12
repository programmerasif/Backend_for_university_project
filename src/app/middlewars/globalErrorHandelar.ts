/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handelZodError from '../errors/handemZodErrors';
import ValidationError from '../errors/ValidationError';
import handelCastError from '../errors/HandelCastError';
import handeDuplicatedError from '../errors/handeDuplicatedError';
import AppError from '../errors/appError';

let globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // seting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: '',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handelZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifyError = ValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (err.name === 'CastError') {
    const simplifyError = handelCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  }else if (err.code === 11000) {
    const simplifyError = handeDuplicatedError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  }else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
