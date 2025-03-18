import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../../helpers/response.helpers';

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;

    if (!roles.includes(userRole)) {
      return errorResponse(res, StatusCodes.FORBIDDEN, 'Access denied. Insufficient permissions.');
    }

    next();
  };
};