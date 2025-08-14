
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import Themes from '../models/themeData.js';;

const router = express.Router();

const themes = [
  {
    "title": "Beach Paradise",
    "image": "https://example.com/images/beach.jpg",
    "location": "Goa, India"
  },
  {
    "title": "Mountain Retreat",
    "image": "https://example.com/images/mountain.jpg",
    "location": "Manali, Himachal Pradesh"
  },
  {
    "title": "Desert Safari",
    "image": "https://example.com/images/desert.jpg",
    "location": "Jaisalmer, Rajasthan"
  },
  {
    "title": "City Lights",
    "image": "https://example.com/images/city.jpg",
    "location": "Mumbai, Maharashtra"
  },
  {
    "title": "Backwater Bliss",
    "image": "https://example.com/images/backwater.jpg",
    "location": "Alleppey, Kerala"
  }
]


router.get("/",async(req,res)=>{
    try{
        // const themes = await Themes.find();
        res.json(themes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;