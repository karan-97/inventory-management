import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '../../src/constants/role-permissions';
import { logError, logInfo } from '../../src/utils/logger/logger';

const prisma = new PrismaClient();

export const seedPermissions = async () => {
  try {
    logInfo('🌱 Seeding Permissions...')
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
    logInfo('✅ Permissions seeded successfully!')
  } catch (error) {
    logError('❌ Error seeding Permissions:', error)
  } finally {
    await prisma.$disconnect();
  }
};