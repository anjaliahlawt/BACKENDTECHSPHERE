import express from "express";
import { createOtp, verifyOtp } from "../controller/otp.js";

const router = express.Router();

// ✅ Route to send OTP
router.post("/", createOtp);

// ✅ Route to verify OTP
router.post("/verify", verifyOtp);

export default router;
