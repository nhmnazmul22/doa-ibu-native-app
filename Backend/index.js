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

import {
  MAX_JSON_SIZE,
  MONGODB_CONNECTION,
  PORT,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIME,
  URL_ENCODED,
  WEB_CACHE,
} from "./app/config/config.js";

// Manually create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Apply
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());

// Request Size Limit
app.use(express.json({ limit: MAX_JSON_SIZE }));

// URL Encode
app.use(express.urlencoded({ extended: URL_ENCODED }));

// Serve audio and images from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Request Rate Limit
const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIME,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web cache
app.set("etag", WEB_CACHE);
app.set("trust proxy", "loopback");

// Add App Router
app.use("/api", router);

// MongoDB connection
mongoose
  .connect(MONGODB_CONNECTION, { autoIndex: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error", err);
  });

// App Run
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
