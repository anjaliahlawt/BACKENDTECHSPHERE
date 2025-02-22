import express from 'express';
import './config/db.js';
import cors from 'cors';
import otpRouter from './routes/otpRouter.js';
import authRouter from './routes/authRouter.js';
import eventcardRouter from './routes/eventcardRouter.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


const salt = await bcrypt.genSalt(10);
console.log("Salt:", salt);

app.use("/otp", otpRouter);
app.use("/auth", authRouter);
app.use('/eventcard',eventcardRouter);
app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
