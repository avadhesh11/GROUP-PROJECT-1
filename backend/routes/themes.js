
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Themes from '../models/themeData.js';;
const router = express.Router();

const themes = [
  {  _id:"1",
    "title": "Beach Paradise",
    "image": "https://example.com/images/beach.jpg",
    "location": "Goa, India"
  },
  {_id: "2",
    "title": "Mountain Retreat",
    "image": "https://example.com/images/mountain.jpg",
    "location": "Manali, Himachal Pradesh"
  },
  {_id: "3",
    "title": "Desert Safari",
    "image": "https://example.com/images/desert.jpg",
    "location": "Jaisalmer, Rajasthan"
  },
  {_id: "4",
    "title": "City Lights",
    "image": "https://example.com/images/city.jpg",
    "location": "Mumbai, Maharashtra"
  },
  {_id: "5",
    "title": "Backwater Bliss",
    "image": "https://example.com/images/backwater.jpg",
    "location": "Alleppey, Kerala"
  }
]


router.get("/",async(req,res)=>{
    try{
      
        res.json(themes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
const foundTheme = themes.find(v => v._id === id);
  if (!foundTheme) {
    return res.status(404).json({ error: "Theme not found" });
  }
  res.json(foundTheme);
});

export default router;