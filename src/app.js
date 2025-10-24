import express from "express";
import cors from "cors";
import routes from "./api/index.js";
import { config } from "./utils/config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default app;
