import { Request, Response } from 'express';
import * as ReportsService from '../services/report.service';
import { exportToCSV, exportToPDF } from '../helpers/export.helpers';
import { successResponse, errorResponse } from '../helpers/response.helpers';
import { StatusCodes } from 'http-status-codes';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { type, exportType, category_id } = req.query;

    const filters = {
        category_id: category_id ? parseInt(category_id as string) : undefined
    };

    let data: any[] = [];
    let fields: string[] = [];
    let fileName: string = '';

    switch (type) {
      case 'total_stock_value':
        data = await ReportsService.getTotalStockValue(filters);
        fields = ['category_id', 'total_value'];
        fileName = 'total_stock_value';
        break;
      case 'out_of_stock':
        data = await ReportsService.getOutOfStockItems(filters);
        fields = ['id', 'name', 'category_id', 'quantity'];
        fileName = 'out_of_stock';
        break;
      case 'low_stock':
        console.log("inside low stocks executin.......")
        data = await ReportsService.getLowStockItems(filters);
        fields = ['id', 'name', 'category_id', 'quantity'];
        fileName = 'low_stock';
        break;
      case 'category_distribution':
        data = await ReportsService.getCategoryWiseDistribution(filters);
        fields = ['category_id', 'total_quantity', 'total_products'];
        fileName = 'category_distribution';
        break;
      default:
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'Invalid report type.');
    }

    if (exportType === 'csv') {
      const filePath = exportToCSV(data, fields, fileName);
      return res.download(filePath);
    }

    if (exportType === 'pdf') {
      const filePath = exportToPDF(data, fields, fileName);
      return res.download(filePath);
    }

    return successResponse(res, StatusCodes.OK, 'Report generated successfully.', data);
  } catch (error: any) {
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
