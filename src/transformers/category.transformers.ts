import { CategoryResponse } from '../types/category.types';

export const transformCategoryData = (category: any): CategoryResponse => {
    return {
        id: category.id,
        name: category.name,
        parentId: category.parent_id,
        subcategories: category.subcategories ? category.subcategories.map((subcategory: any) => transformCategoryData(subcategory)) : undefined
    };
};