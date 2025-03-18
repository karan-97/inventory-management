export interface CategoryData {
  name: string;
  parentId?: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  parentId: number | null;
  subcategories?: CategoryResponse[];
}