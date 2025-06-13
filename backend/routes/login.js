import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from '../models/user.js';
const router = express.Router();

dotenv.config();
 router.post('/',async(req,res)=>{
     console.log("LOGIN ROUTE HIT");
  const {email,password}=req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  try{
    const user=await User.findOne({email,password});
    if(!user) return res.status(400).json({error:"user not found! kinndly check your credentails and try again or sign up!"});
    return res.status(200).json({message:"user logged in succesfully"});
  }catch(err){
     return res.status(500).json({error:"server error occured"});
  }
  });

export default router;