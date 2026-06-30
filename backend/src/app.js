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
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
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