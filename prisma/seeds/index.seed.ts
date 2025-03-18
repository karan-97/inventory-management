
import { seedRoles } from './roles.seeder';
import { seedPermissions } from './permissions.seed';
import { seedRolePermissions } from './role-permissions.seed';
import { seedAdmin } from './admin.seed';
import { logError, logInfo } from '../../src/utils/logger/logger';

const runSeeds = async () => {
  try {
    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();
    await seedAdmin();
    logInfo("'All seeding completed successfully!'")
  } catch (error) {
    logError('Error while seeding:', error)
  }
};

runSeeds();
