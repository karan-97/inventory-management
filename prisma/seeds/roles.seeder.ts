import { PrismaClient } from '@prisma/client';
import { ROLES } from '../../src/constants/role-permissions';
const prisma = new PrismaClient();

export const seedRoles = async () => {
  try {
    console.log('🌱 Seeding Roles...');
    const roles = Object.values(ROLES); // ['admin', 'user']

    for (const roleName of roles) {
      await prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName }
      });
    }

    console.log('✅ Roles seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Roles:', error);
  } finally {
    await prisma.$disconnect();
  }
};