import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants/jwt';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../../helpers/response.helpers';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Access denied.');
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      (req as any).user = decoded;
      next();
    } catch (error) {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid token.');
    }
  };