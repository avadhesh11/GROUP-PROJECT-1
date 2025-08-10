import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from '../models/user.js';
import auth from '../services/auth.js';
import verify from '../middlewares/verify.js';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();
router.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
dotenv.config();
 router.post('/',async(req,res)=>{
     console.log("LOGIN ROUTE HIT");
  const {email,password}=req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try{
    const user=await User.findOne({email});
     if(!user) return res.status(400).json({error:"user not found! kinndly check your credentails and try again or sign up!"});
      const check=await bcrypt.compare(password,user.password);
      if(!check) return res.status(400).json({message:"invalid credentials"});
   
        const token=auth.save(user);
      res.cookie("refreshToken",token,{
        httpOnly:false,
        secure:true,
        sameSite:"strict",
        maxAge:10*24*60*60*1000
      });
    return res.status(200).json({message:"user logged in succesfully"});
  }catch(err){
     console.error("error (login route):",err);
  }
  });
router.post('/set-cookie', async (req, res) => {
  const { token } = req.body;
  try {
    res.cookie("refreshToken",token,{
        httpOnly:false,
        secure:false,
        sameSite:"strict",
        maxAge:10*24*60*60*1000
      });
    return res.status(200).json({message:"user logged in succesfully"});
  }catch(err){
     console.error("error (login route):",err);
  }
   
});
export default router;