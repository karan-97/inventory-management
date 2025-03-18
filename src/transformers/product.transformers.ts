import { ProductResponse } from '../types/product.types';

export const transformProductData = (product: any): ProductResponse => {
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
    updatedAt: product.updated_at,
  };
};
