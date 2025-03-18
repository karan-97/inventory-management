import { Prisma } from '@prisma/client';
import { pagination } from '../helpers/response.helpers';
import { prisma } from '../utils/database/config.database';
import { sendLowStockAlert } from '../helpers/alert.helpers';
import { ProductData, ProductResponse } from '../types/product.types';
import { transformProductData } from '../transformers/product.transformers';


export const createProduct = async (data: ProductData): Promise<ProductResponse> => {
  const existingProduct = await prisma.product.findUnique({
    where: { name: data.name }
  });

  if (existingProduct) {
    throw { statusCode: 409, message: 'A product with this name already exists.' };
  }

  const product = await prisma.product.create({
    data,
    include: {
      category: true,
      user: true
    }
  });

  return transformProductData(product);
};

export const getAllProducts = async (filters: any, page: number, limit: number): Promise<any> => {
  const offset = (page - 1) * limit;


  const whereFilter: Prisma.ProductWhereInput = {
    AND: [
      filters.category_id ? { category_id: Number(filters.category_id) } : {},
      filters.name ? { name: { contains: filters.name, mode: 'insensitive' } } : {},
      filters.min_price ? { price: { gte: filters.min_price } } : {},
      filters.max_price ? { price: { lte: filters.max_price } } : {}
    ],
  };


  const [products, totalRecords] = await Promise.all([
    prisma.product.findMany({
      where: whereFilter,
      include: {
        category: true,
        user: true,
      },
      skip: offset,
      take: limit,
    }),
    prisma.product.count({ where: whereFilter })
  ]);


  const formattedProducts = products.map(transformProductData);  

  return pagination(formattedProducts, totalRecords, page, limit);
};

export const getProductById = async (id: number): Promise<ProductResponse | null> => {
  const product = await prisma.product.findUnique({
    where: {
      id: id
    },
    include: {
      category: true,
      user: true
    }
  });

  if (!product) {
    throw { statusCode: 404, message: 'Product not found.' };
  }

  return transformProductData(product);

};

export const updateProduct = async (id: number, data: Partial<ProductData>): Promise<ProductResponse>  => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw { statusCode: 404, message: 'Product not found.' };
  }


  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
      user: true
    }
  });

  return transformProductData(updatedProduct);
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({ where: { id } });
};

export const updateStock = async (productId: number, quantityChange: number, userId: number): Promise<ProductResponse> => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      user: true,
      category: true
    }
  });

  if (!product) {
    throw { statusCode: 404, message: 'Product not found.' };
  }

  if (quantityChange < 0 && product.quantity + quantityChange < 0) {
    throw { statusCode: 400, message: 'Insufficient stock available.' };
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      quantity: { increment: quantityChange }
    },
    include: {
      user: true,
      category: true
    }
  });


  if (updatedProduct.quantity <= updatedProduct.low_stock_threshold) {
    await sendLowStockAlert(updatedProduct, userId);
  }

  return transformProductData(updatedProduct);
};

export const lowStockAlert = async (): Promise<ProductResponse[]> => {
  const products = await prisma.product.findMany({
    where: {
      quantity: {
        lte: prisma.product.fields.low_stock_threshold
      }
    }
  });
  return products.map(transformProductData);

};
