import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from "dotenv";
import { setupSwagger } from './docs/swagger.docs';
import routes from './routes/index';
import { apiRateLimiter } from './utils/middleware/rate-limiter.middleware';
import { errorHandler } from './utils/middleware/error.middlware';
import 'express-async-errors';
dotenv.config();

const app = express();

app.use(cors({origin:"*"}));
app.use(helmet());
app.use(express.json());
app.use(apiRateLimiter);
app.use('/api/v1', routes);
setupSwagger(app);

// Global Error Handler
app.use(errorHandler);

export default app;