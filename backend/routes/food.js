import express from "express";
import Food from "../models/foodData.js";
import axios from "axios";

const router = express.Router();

const foods = [
  {
    _id: "1",
    title: "Jeet Royal",
    image: "http://localhost:5000/images/jeetroyal.png",
    rating: 4.5,
    review: 12,
    location: "Ratlam",
    type: "Veg-Menu",
    price: 1500
  },
  {
    _id: "2",
    title: "Spice Junction",
    image: "http://localhost:5000/images/spicejunction.png",
    rating: 4.2,
    review: 20,
    location: "Indore",
    type: "Non-Veg",
    price: 1800
  },
  {
    _id: "3",
    title: "Green Garden",
    image: "http://localhost:5000/images/greengarden.png",
    rating: 4.8,
    review: 35,
    location: "Bhopal",
    type: "Veg",
    price: 1200
  }
];

router.get("/", async(req,res)=>{
    try{
        // const foods = await Food.find();
        res.json(foods);
    }catch(error){
        console.log("Error sending receiving food between backend and db",error);
    }
})

export default router;