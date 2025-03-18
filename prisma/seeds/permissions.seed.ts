import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '../../src/constants/role-permissions';

const prisma = new PrismaClient();

export const seedPermissions = async () => {
  try {
    console.log('🌱 Seeding Permissions...');
    const allPermissions = [
      ...PERMISSIONS.PRODUCT,
      ...PERMISSIONS.CATEGORY,
      ...PERMISSIONS.REPORT
    ];

    for (const permission of allPermissions) {
      await prisma.permission.upsert({
        where: { name: permission },
        update: {},
        create: { name: permission }
      });
    }

    console.log('✅ Permissions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
};