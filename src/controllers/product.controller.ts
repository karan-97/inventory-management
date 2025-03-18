import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as ProductService from '../services/product.service';
import { successResponse, errorResponse } from '../helpers/response.helpers';
import camelize from 'camelize';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProduct(req.body);
    return successResponse(res, StatusCodes.CREATED, 'Product created successfully.', camelize(product));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const products = await ProductService.getAllProducts(req.query, page, limit);
    
    return successResponse(res, StatusCodes.OK, 'Products fetched successfully.', camelize(products));
  } catch (error: any) {
    const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    return errorResponse(res, statusCode, error.message);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductById(Number(req.params.id));
    return successResponse(res, StatusCodes.OK, 'Product details fetched successfully.', camelize(product));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.updateProduct(Number(req.params.id), req.body);
    return successResponse(res, StatusCodes.OK, 'Product updated successfully.', camelize(product));
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await ProductService.deleteProduct(Number(req.params.id));
    return successResponse(res, StatusCodes.OK, 'Product deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const quantityChange = Number(req.body.quantityChange);

    const updatedProduct = await ProductService.updateStock(productId, quantityChange, (req as any).user.id);
    return successResponse(res, StatusCodes.OK, 'Stock updated successfully.', camelize(updatedProduct));
  } catch (error: any) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return errorResponse(res, statusCode, error.message);
  }
};
