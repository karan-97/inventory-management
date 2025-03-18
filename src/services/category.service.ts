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
  return prisma.category.findUnique({
    where: { id },
    include: {
      subcategories: true,
    },
  });
};

export const updateCategory = async (id: number, data: CategoryData) => {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      parent_id: data.parentId || null,
    },
  });
};

export const deleteCategory = async (id: number) => {
  return prisma.category.delete({ where: { id } });
};
