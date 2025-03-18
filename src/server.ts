import http from 'http';
import app from './app';
import { connectDB } from './utils/database/config.database';
import dotenv from 'dotenv';
import { logError, logInfo } from './utils/logger/logger';

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      logInfo(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    logError('❌ Server startup failed:', error);
  }
};

startServer();