import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "../models/user.js";

const router = express.Router();

dotenv.config();

router.post('/signup', async (req, res) => {
  console.log("Received body from frontend:", req.body);

  const { name, phone, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    const exist2 = await User.findOne({ phone });

    if (exist) {
      return res.status(400).json({
        error: "Email already exists! Kindly login or click on forgot password",
      });
    }

    if (exist2) {
      return res.status(400).json({
        error: "Phone number already exists! Kindly login or click on forgot password",
      });
    }

    const newUser = new User({ name, phone, email, password });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error occurred!" });
  }
});

export default router;
