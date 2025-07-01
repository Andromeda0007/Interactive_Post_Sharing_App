import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRoute.js";
import tweetRoutes from "./routers/tweetRoute.js";
import cors from "cors";

// Load env variables
dotenv.config({ path: ".env" });

// Init Express
const app = express();

// Connect to DB
databaseConnection();

// CORS setup using env variable
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Coming from Backend."
  });
});

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
