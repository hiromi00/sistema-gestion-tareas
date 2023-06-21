import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../constants';
import { BaseError } from '../utils';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('errorHandler -----> ', err);
  const code = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;

  const indexOfHttpCode = Object.values(HttpStatusCodes).indexOf(
    code as unknown as HttpStatusCodes
  );

  const error = {
    ...err,
    message: err.message,
    description: err.description,
  };
  res.status(code);
  res.json(
    new BaseError(code, Object.keys(HttpStatusCodes)[indexOfHttpCode], error.message, err.data)
  );
};
