import express from 'express';
import './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import otpRouter from './routes/otpRouter.js';
import authRouter from './routes/authRouter.js';
import eventcardRouter from './routes/eventcardRouter.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: [FRONTEND_URL], // Dynamic frontend URL based on environment
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"]
}));

const salt = await bcrypt.genSalt(10);
console.log("Salt:", salt);

const PORT = process.env.PORT || 3002;

app.use("/otp", otpRouter);
app.use("/auth", authRouter);
app.use('/eventcard', eventcardRouter);

app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
