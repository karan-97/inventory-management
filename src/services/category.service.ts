import { prisma } from '../utils/database/config.database';
import { CategoryData, CategoryResponse } from '../types/category.types';
import { transformCategoryData } from '../transformers/category.transformers';


export const createCategory = async (data: CategoryData): Promise<CategoryResponse> => {
    const category = await prisma.category.create({
        data: {
            name: data.name,
            parent_id: data.parentId || null,
        },
    });
    return transformCategoryData(category);
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    const categories = await prisma.category.findMany({
        where: { parent_id: null },
        include: {
            subcategories: true,
        },
    });
    return categories.map(transformCategoryData);
};

export const getCategoryById = async (id: number): Promise<CategoryResponse | any> => {
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            subcategories: {
                select: {
                    id: true,
                    name: true,
                    parent_id: true
                }
            }
        }
    });

    if (!category) {
        throw new Error("Category not found!");
    }

    return transformCategoryData(category);
};

export const updateCategory = async (id: number, data: CategoryData): Promise<CategoryResponse> => {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new Error('Category not found.');

    if (data.parentId === id) {
        throw new Error('A category cannot be its own parent.');
    }

    // Validate parentId if provided
    if (data.parentId) {
        const parentCategory = await prisma.category.findUnique({ where: { id: data.parentId } });
        if (!parentCategory) {
            throw new Error('Parent category does not exist.');
        }

        const isSubcategory = await prisma.category.findFirst({
            where: { parent_id: id, id: data.parentId }
        });

        if (isSubcategory) {
            throw new Error('Cannot assign a subcategory as a parent.');
        }
    }

    const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
            name: data.name,
            parent_id: data.parentId || null,
        }
    });

    return transformCategoryData(updatedCategory);
};

export const deleteCategory = async (id: number) => {
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            subcategories: true,
            products: true
        }
    });

    if (!category) {
        throw new Error('Category not found.');
    }

    return await prisma.category.delete({ where: { id } });
};
