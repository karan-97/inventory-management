import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as CategoryService from '../services/category.service';
import { successResponse, errorResponse } from '../helpers/response.helpers';
import camelize from 'camelize';

export const create = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    return successResponse(res, StatusCodes.CREATED, 'Category created successfully.', camelize(category));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create category.', error.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return successResponse(res, StatusCodes.OK, 'Categories fetched successfully.', camelize(categories));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch categories.', error.message);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.getCategoryById(Number(req.params.id));
    if (!category) {
      return errorResponse(res, StatusCodes.NOT_FOUND, 'Category not found.');
    }
    return successResponse(res, StatusCodes.OK, 'Category fetched successfully.', camelize(category));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch category.', error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.updateCategory(Number(req.params.id), req.body);
    return successResponse(res, StatusCodes.OK, 'Category updated successfully.', camelize(category));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update category.', error.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await CategoryService.deleteCategory(Number(req.params.id));
    return successResponse(res, StatusCodes.OK, 'Category deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete category.', error.message);
  }
};
