import { NextFunction, Request, RequestHandler, Response } from "express";

// this is a hireorder function use for avoiding DRY code
const catchAsync = (fun: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fun(req, res, next)).catch(err => next(err));
    };
  };
  export default catchAsync