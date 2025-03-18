import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logError } from '../logger/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logError('Error:', err.message);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Something went wrong!',
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR
  });
};