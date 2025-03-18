import express from "express";
import healthRoute from './health.route';
import authRoutes from './auth.routes';

const router: express.Router = express.Router()

router.use("/health-check", healthRoute);
router.use("/auth", authRoutes);

export default router;