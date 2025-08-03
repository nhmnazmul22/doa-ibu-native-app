import path from "path";
import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";
import { fileURLToPath } from "url";
import next from "next";

import {
  MAX_JSON_SIZE,
  MONGODB_CONNECTION,
  PORT,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIME,
  URL_ENCODED,
  WEB_CACHE,
} from "./app/config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Security Middleware
  app.use(cors());
  app.use(helmet());
  app.use(hpp());
  app.use(cookieParser());

  app.use(express.json({ limit: MAX_JSON_SIZE }));
  app.use(express.urlencoded({ extended: URL_ENCODED }));

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  const limiter = rateLimit({
    windowMs: REQUEST_LIMIT_TIME,
    max: REQUEST_LIMIT_NUMBER,
  });
  app.use(limiter);

  app.set("etag", WEB_CACHE);
  app.set("trust proxy", "loopback");

  // Connect to MongoDB
  await mongoose.connect(MONGODB_CONNECTION, { autoIndex: true });
  console.log("Database Connected");

  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({ dev: false, dir: "./admin" });
  const handle = nextApp.getRequestHandler();

  // **Important: wait for Next.js to prepare before mounting handlers**
  await nextApp.prepare();

  // Your API routes
  app.use("/api", router);

  // Let Next.js handle all other routes
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start Express server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

// Start everything and catch errors
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
