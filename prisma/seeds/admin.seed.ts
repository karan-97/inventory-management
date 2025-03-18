import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs'
import { logdWarning, logError, logInfo } from '../../src/utils/logger/logger';
import { ROLES } from '../../src/constants/role-permissions';


const prisma = new PrismaClient();

interface User {
    name: string
    email: string;
    password: string;
}

const seedAdmin = async () => {
    try {

        const adminRole = await prisma.role.findUnique({ where: { name: ROLES.ADMIN } });

        if (!adminRole) {
            throw new Error('Admin role not found. Seed roles first.');
        }

        const saltRounds = process.env.SALT_ROUND
            ? parseInt(process.env.SALT_ROUND)
            : 10;

        const hashedPassword = await bcryptjs.hash(
            process.env.ADMIN_PASSWORD || "Admin@123",
            saltRounds
        );

        const createUser: User = {
            name: process.env.ADMIN_NAME || "Karan Ganwani",
            email: process.env.ADMIN_EMAIL || "admin@inventory.com",
            password: hashedPassword,
        };

        const userExist = await prisma.user.findUnique({
            where: {
                email: createUser.email,
            },
        });

        if (userExist) {
            logdWarning("Admin already exist");
            return;
        }

        await prisma.user.create({
            data: {
                name: createUser.name,
                email: createUser.email,
                password: createUser.password,
                role_id: adminRole?.id!
            }
        });

        logInfo(' Admin Seeding completed. ')
    } catch (error: any) {
        logError("Error creating seed admin:", error)
    } finally {
        await prisma.$disconnect();
    }
}

export { seedAdmin }