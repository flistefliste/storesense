import express from "express";
import { askQuestion } from "../services/rag.service.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { question } = req.body;
    const result = await askQuestion(question);
    res.json({ answer: result.text });
  } catch (err) {
    next(err);
  }
});

export default router;

