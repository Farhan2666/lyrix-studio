import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { authRouter } from "./routes/auth";
import { audioRouter } from "./routes/audio";
import { designRouter } from "./routes/design";
import { templateRouter } from "./routes/template";
import { exportRouter } from "./routes/export";
import { hueRouter } from "./routes/hue";
import { notFoundHandler, errorHandler } from "./middleware/error";

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/audio", audioRouter);
app.use("/api/design", designRouter);
app.use("/api/templates", templateRouter);
app.use("/api/export", exportRouter);
app.use("/api/hue", hueRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Lyrix Studio API running on port ${PORT}`);
});

export default app;
