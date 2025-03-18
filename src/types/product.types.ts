export interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  low_stock_threshold: number;
  supplier?: string;
  category_id: number;
  added_by: number;
}

export interface ProductResponse {
  id: number;
  uuid: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  supplier?: string;
  category: {
    id: number;
    name: string;
  };
  addedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
