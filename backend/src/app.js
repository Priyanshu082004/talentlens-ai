console.log(">>> APP.JS EXECUTED <<<");




import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
console.log("CLIENT_URL =", process.env.CLIENT_URL);
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175"].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);




app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/profile", profileRouter);

console.log("Registering auth routes...");
export default app;