import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createOtp } from "./otp.js";
dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: "fail", message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.verified) {
    return res.status(400).json({ status: "fail", message: "User already exists" });
  }

  // If user exists but is NOT verified, resend OTP and show proper message
  if (existingUser && !existingUser.verified) {
    await createOtp({ body: { email, isresend: true } }, res);
    return res.status(200).json({ 
      status: "success", 
      message: "User already registered but not verified. OTP sent again. Please verify your email."
    });
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, verified: false });
  await newUser.save();

  res.status(201).json({ status: "success", message: "User registered. Please verify your email with OTP." });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "fail", message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ status: "fail", message: "Invalid email or password" });
  }

  if (!user.verified) {
    return res.status(403).json({ status: "fail", message: "Please verify your email first" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  
  res.cookie("token", token, {
    httpOnly: true, 
     secure:false,
    sameSite: "lax", 
    maxAge: 60 * 60 * 1000, 
  });

  res.status(200).json({ status: "success", message: "Login successful" });
};

const getUserProfile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", message: "Profile data accessed", user });
  } catch (error) {
    return res.status(403).json({ status: "fail", message: "Invalid or expired token" });
  }
};

export { signup, login, getUserProfile };
