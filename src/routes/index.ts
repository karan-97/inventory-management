import express from "express";
import healthRoute from './health.route';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import productsRoute from './product.routes';
import reportRoute from './report.routes';

const router: express.Router = express.Router()

router.use("/health-check", healthRoute);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productsRoute);
router.use("/reports", reportRoute);

export default router;