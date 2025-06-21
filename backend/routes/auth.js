import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from '../models/user.js';
import auth from '../services/auth.js';
import verify from '../middlewares/verify.js';
const router = express.Router();

dotenv.config();
 
  router.post('/signup',async(req,res)=>{
     console.log("Received body from frontend:", req.body); 
   const {name,phone,email,password}=req.body;
   try{
    const exist=await User.findOne({email});
    const exist2=await User.findOne({phone});
    if(exist ) return res.status(400).json({error:"email already exist! kindly login or click on forgot password"});
     if(exist2) return res.status(400).json({error:"phone number already exist! kindly login or click on forgot password"});
    const newUser=new User({name,phone,email,password});
    await newUser.save();
       const token=auth.save(newUser);
  res.cookie("refreshToken",token,{
    httpOnly:false,
    secure:true,
    sameSite:"lax",
    maxAge:10*24*60*60*1000
  });
   return res.status(200).json({message:"user registered succesfully"});
   }catch(err){
   res.status(500).json({error:"server error occured!"});
   }
  });
  
 

  export default router;