import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Venue from '../models/venueData.js';
const router = express.Router();

const venue = [
  {
    _id: "1",
    title: "The Grand Palace",
    image: "https://via.placeholder.com/400x250",
    rating: 4.5,
    review: 112,
    location: "123 Main St, Delhi",
    type: "Hotel",
    vegprice: 450,
    nonvegprice: 850,
    capacity: 300,
    room: 20,
    more: 5
  },
  {
    _id: "2",
    title: "Royal Banquet Hall",
    image: "https://via.placeholder.com/400x250",
    rating: 4.2,
    review: 86,
    location: "Bandra West, Mumbai",
    type: "Banquet",
    vegprice: 400,
    nonvegprice: 700,
    capacity: 250,
    room: 15,
    more: 3
  },
  {
    _id: "3",
    title: "Sunshine Lawn",
    image: "https://via.placeholder.com/400x250",
    rating: 4.8,
    review: 140,
    location: "Salt Lake, Kolkata",
    type: "Lawn",
    vegprice: 500,
    nonvegprice: 950,
    capacity: 500,
    room: 10,
    more: 7
  },
  {
    _id: "1",
    title: "The Grand Palace",
    image: "https://via.placeholder.com/400x250",
    rating: 4.5,
    review: 112,
    location: "123 Main St, Delhi",
    type: "Hotel",
    vegprice: 450,
    nonvegprice: 850,
    capacity: 300,
    room: 20,
    more: 5
  }
];

router.get("/",async(req,res)=>{
    try{

        res.json(venue);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
const foundVenue = venue.find(v => v._id === id);
  if (!foundVenue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  res.json(foundVenue);
});

export default router;