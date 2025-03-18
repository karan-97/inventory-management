import http from 'http';
import app from './app';
import { connectDB } from './utils/database/config.database';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
  }
};

startServer();