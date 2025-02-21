import Otp from "../model/otp.js";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import sendMail from "../utils/mail.js";
const createOtp = async (req, res) => {
  const { body } = req;
  const { email, isresend = false } = body;

  if (!email) {
    return res.status(400).json({
      status: "fail",
      message: "email is required",
    });
  }

  const oldotp = await Otp.findOne({
    email: email,
    createdAt: {
      $gte: Date.now() - 1 * 60 * 1000,
    },
  });

  if (!isresend && oldotp) {
    return res.status(403).json({
      status: "fail",
      message: "OTP already sent. Please wait before requesting again.",
    });
  }
  const otpvalues = Math.floor(Math.random() * 8999 + 1000);

  try {
    const [ismailsent, errormessage] = await sendMail({
      email: email,
      subject: "OTP for verification",
      text: `Your OTP value is ${otpvalues}`,
      html: `<html>
        <head>
            <style>
                h1 { background-color: red; color: green; }
            </style>
        </head>
        <h1>Your one-time password is ${otpvalues}</h1>
      </html>`,
    });

    if (!ismailsent) {
      return res.status(500).json({
        status: "fail",
        message: errormessage,
      });
    }

    const salt = await bcrypt.genSalt(16);
    const hashedOTP = await bcrypt.hash("" + otpvalues, salt);

    await Otp.create({
      otp: hashedOTP,
      email: email,
    });

    res.status(200).json({
      status: "success",
      message: "OTP sent",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error sending OTP",
    });
  }
};

// **Verify OTP Function**
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ status: "fail", message: "Email and OTP are required" });
  }

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ status: "fail", message: "OTP expired or not found" });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare("" + otp, otpRecord.otp);

    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Invalid OTP" });
    } 
    await Otp.deleteOne({ email });

    await User.updateOne({ email }, { $set: { verified: true } });


    res
      .status(200)
      .json({ status: "success", message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error verifying OTP" });
  }
};

export { createOtp, verifyOtp };
