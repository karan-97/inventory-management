import { prisma } from '../utils/database/config.database';

interface CategoryData {
    name: string;
    parentId?: number;
}

export const createCategory = async (data: CategoryData) => {
    return prisma.category.create({
        data: {
            name: data.name,
            parent_id: data.parentId || null,
        },
    });
};

export const getAllCategories = async () => {
    return prisma.category.findMany({
        where: { parent_id: null },
        include: {
            subcategories: true,
        },
    });
};

export const getCategoryById = async (id: number) => {
    return await prisma.category.findUnique({
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
};

export const updateCategory = async (id: number, data: CategoryData) => {
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
    
    return prisma.category.update({
        where: { id },
        data: {
          name: data.name,
          parent_id: data.parentId || null,
        }
      });
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
