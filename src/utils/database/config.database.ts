import { PrismaClient } from '@prisma/client';
import { logError, logInfo } from '../logger/logger';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    logInfo('✅ Database connected successfully.');
  } catch (error) {
    logError('❌ Database connection failed:', error);
    process.exit(1); // Exit if DB connection fails
  }
};

export { prisma, connectDB };