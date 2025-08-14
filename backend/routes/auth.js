import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from '../models/user.js';
import auth from '../services/auth.js';
import verify from '../middlewares/verify.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
const router = express.Router();

dotenv.config();
 const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS   
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received body from frontend:", req.body);
const hashedpass= await bcrypt.hash(password,10);
  try {
    const exist = await User.findOne({ email });
    
    if (exist) return res.status(400).json({ error: "Email already exists!" });
   

    const otp = generateOTP();


    otpStore.set(email, { otp, user: { name, email,password: hashedpass } });
    setTimeout(() => otpStore.delete(email), 10 * 60 * 1000);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Wedding App",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes. Please do not share it with anyone.`
    });

    return res.status(200).json({ message: "OTP sent to email!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error occurred!" });
  }
});
router.post('/glogin', async (req, res) => {
  const { fullname,email } = req.body;
  console.log("Received body from frontend:", req.body);
  try {
    const exist = await User.findOne({ email });
 if (exist) return res.status(409).json({ message: "Email already exists!" });
 const name=fullname;
     const newUser = new User({name,email});
  await newUser.save();
  console.log("DATA STORED FOR GLOGIN");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error occurred!" });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record) return res.status(400).json({ error: "No OTP found. Please register again." });

  if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
  const newUser = new User(record.user);
  await newUser.save();

  otpStore.delete(email);

  const token = auth.save(newUser);
  res.cookie("refreshToken", token, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json({ message: "User registered and verified successfully!" });
});

export default router;