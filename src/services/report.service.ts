import { formatProductData } from '../transformers/report.trasnformers';
import { ReportFilters } from '../types/report.types';
import { prisma } from '../utils/database/config.database';

export const getTotalStockValue = async (filters: ReportFilters) => {
  const result = await prisma.product.groupBy({
    by: ['category_id'],
    _sum: { quantity: true, price: true },
    where: filters.category_id ? { category_id: filters.category_id } : undefined
  });

  return result.map(item => ({
    category_id: item.category_id,
    total_value: Number(item._sum.quantity) * Number(item._sum.price)
  }));
};

export const getOutOfStockItems = async (filters: ReportFilters) => {
  const products = await prisma.product.findMany({
    where: {
      quantity: 0,
      ...(filters.category_id && { category_id: filters.category_id })
    },
    include: { 
      category: true,
      user: true
    }
  });

  return products.map(formatProductData);
};

export const getLowStockItems = async (filters: ReportFilters) => {
    
  const products = await prisma.product.findMany({
    where: {
      quantity: { lte: prisma.product.fields.low_stock_threshold },
      ...(filters.category_id && { category_id: filters.category_id })
    },
    include: { category: true, user: true }
  });

  return products.map(formatProductData);
};

export const getCategoryWiseDistribution = async (filters: ReportFilters) => {
  const result = await prisma.product.groupBy({
    by: ['category_id'],
    _sum: { quantity: true },
    _count: true,
    where: filters.category_id ? { category_id: filters.category_id } : undefined
  });

  return result.map(item => ({
    category_id: item.category_id,
    total_quantity: item._sum.quantity,
    total_products: item._count
  }));
};
