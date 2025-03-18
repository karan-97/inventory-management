import { PrismaClient } from '@prisma/client';
import { ROLES } from '../../src/constants/role-permissions';
import { logError, logInfo } from '../../src/utils/logger/logger';
const prisma = new PrismaClient();

export const seedRoles = async () => {
  try {
    logInfo('🌱 Seeding Roles...');
    const roles = Object.values(ROLES); // ['admin', 'user']

    for (const roleName of roles) {
      await prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName }
      });
    }

    logInfo('✅ Roles seeded successfully!');
  } catch (error) {
    logError('❌ Error seeding Roles:', error);
  } finally {
    await prisma.$disconnect();
  }
};