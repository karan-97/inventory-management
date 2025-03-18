import { Prisma } from '@prisma/client';
import { pagination } from '../helpers/response.helpers';
import { prisma } from '../utils/database/config.database';
import { sendLowStockAlert } from '../helpers/alert.helpers';

interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  low_stock_threshold: number;
  supplier?: string;
  category_id: number;
  added_by: number;
}

export const createProduct = async (data: ProductData) => {
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

  return {
    id: product.id,
    uuid: product.uuid,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    quantity: product.quantity,
    lowStockThreshold: product.low_stock_threshold,
    supplier: product.supplier,
    category: {
      id: product.category.id,
      name: product.category.name,
    },
    addedBy: product.user.name,
    createdAt: product.created_at,
    updatedAt: product.updated_at
  };
};

export const getAllProducts = async (filters: any, page: number, limit: number) => {
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


  const formattedProducts = products.map(product => ({
    id: product.id,
    uuid: product.uuid,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    quantity: product.quantity,
    lowStockThreshold: product.low_stock_threshold,
    supplier: product.supplier,
    category: {
      id: product.category.id,
      name: product.category.name
    },
    addedBy: product.user.name,
    createdAt: product.created_at,
    updatedAt: product.updated_at
  }));

  return pagination(formattedProducts, totalRecords, page, limit);
};

export const getProductById = async (id: number) => {
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

  return {
    id: product.id,
    uuid: product.uuid,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    quantity: product.quantity,
    lowStockThreshold: product.low_stock_threshold,
    supplier: product.supplier,
    category: {
      id: product.category.id,
      name: product.category.name,
    },
    addedBy: product.user.name,
    createdAt: product.created_at,
    updatedAt: product.updated_at
  };

};

export const updateProduct = async (id: number, data: Partial<ProductData>) => {
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

  return {
    id: updatedProduct.id,
    uuid: updatedProduct.uuid,
    name: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price.toNumber(),
    quantity: updatedProduct.quantity,
    lowStockThreshold: updatedProduct.low_stock_threshold,
    supplier: updatedProduct.supplier,
    category: {
      id: updatedProduct.category.id,
      name: updatedProduct.category.name
    },
    addedBy: updatedProduct.user.name,
    createdAt: updatedProduct.created_at,
    updatedAt: updatedProduct.updated_at
  };
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({ where: { id } });
};

export const updateStock = async (productId: number, quantityChange: number, userId: number) => {
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

  // Check for low stock threshold
  if (updatedProduct.quantity <= updatedProduct.low_stock_threshold) {
    await sendLowStockAlert(updatedProduct, userId);
  }

  return {
    id: updatedProduct.id,
    uuid: updatedProduct.uuid,
    name: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price.toNumber(),
    quantity: updatedProduct.quantity,
    lowStockThreshold: updatedProduct.low_stock_threshold,
    supplier: updatedProduct.supplier,
    category: {
      id: updatedProduct.category.id,
      name: updatedProduct.category.name
    },
    addedBy: updatedProduct.user.name,
    createdAt: updatedProduct.created_at,
    updatedAt: updatedProduct.updated_at
  };
};

export const lowStockAlert = async () => {
  return prisma.product.findMany({
    where: {
      quantity: {
        lte: prisma.product.fields.low_stock_threshold
      }
    }
  });
};
