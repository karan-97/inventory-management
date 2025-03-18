import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registerUser, loginUser } from '../services/auth.service';
import { ROLES } from '../constants/role-permissions';
import camelize from "camelize";
import { errorResponse, successResponse } from '../helpers/response.helpers';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    const rolesValues = Object.values(ROLES)

    if (!rolesValues.includes(role)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid role.' });
    }

    const user = await registerUser({ name, email, password, role });
    return successResponse(res, StatusCodes.CREATED, 'User registered successfully.', camelize(user));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.BAD_REQUEST, error.message);
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { token, userData } = await loginUser(email, password);
    const data = { token: token, user: userData };
    return successResponse(res, StatusCodes.OK, 'User logged in successfully.', camelize(data));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.BAD_REQUEST, error.message);
  }
};
