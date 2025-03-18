
import { seedRoles } from './roles.seeder';
import { seedPermissions } from './permissions.seed';
import { seedRolePermissions } from './role-permissions.seed';
import { seedAdmin } from './admin.seed';

const runSeeds = async () => {
  try {
    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();
    await seedAdmin();
    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Error while seeding:', error);
  }
};

runSeeds();
