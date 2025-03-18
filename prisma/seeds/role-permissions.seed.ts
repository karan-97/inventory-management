import { PrismaClient } from '@prisma/client';
import { ROLE_PERMISSIONS } from '../../src/constants/role-permissions';

const prisma = new PrismaClient();

export const seedRolePermissions = async () => {
  try {
    console.log('🌱 Seeding Role-Permissions...');

    for (const [roleName, permissions] of Object.entries(ROLE_PERMISSIONS)) {
      const role = await prisma.role.findUnique({ where: { name: roleName } });

      for (const permissionName of permissions) {
        const permission = await prisma.permission.findUnique({ where: { name: permissionName } });

        if (role && permission) {
          await prisma.rolePermission.upsert({
            where: {
              role_id_permission_id: {
                role_id: role.id,
                permission_id: permission.id
              }
            },
            update: {},
            create: {
              role_id: role.id,
              permission_id: permission.id
            }
          });
        }
      }
    }

    console.log('✅ Role-Permissions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Role-Permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
};
