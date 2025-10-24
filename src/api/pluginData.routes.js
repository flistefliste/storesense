import express from "express";
import { ingestPluginData } from "../services/dataIngestion.service.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { shop_id, data } = req.body;
    await ingestPluginData(shop_id, data);
    res.json({ status: "ok" });
  } catch (err) {
    next(err);
  }
});

export default router;
