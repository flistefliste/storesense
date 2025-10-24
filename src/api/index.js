import express from "express";
import pluginRoutes from "./pluginData.routes.js";
import questionRoutes from "./questions.routes.js";

const router = express.Router();
router.use("/plugin-data", pluginRoutes);
router.use("/questions", questionRoutes);

export default router;
