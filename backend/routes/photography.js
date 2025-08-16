import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Photography from '../models/photographyData.js';
const router = express.Router();

const photography = [
  {
    _id: "1",
    title: "Pixel Perfect Studios",
    image: "https://via.placeholder.com/400x250",
    rating: 4.7,
    reviews: 98,
    location: "Connaught Place, Delhi",
    specialty: "Wedding Photography",
    pricePerDay: 15000,
    experience: "10 years",
    more: 5  
  },
  {
    _id: "2",
    title: "Golden Lens Photography",
    image: "https://via.placeholder.com/400x250",
    rating: 4.6,
    reviews: 85,
    location: "Andheri West, Mumbai",
    specialty: "Pre-Wedding Shoots",
    pricePerDay: 12000,
    experience: "8 years",
    more: 4
  },
  {
    _id: "3",
    title: "Candid Captures",
    image: "https://via.placeholder.com/400x250",
    rating: 4.9,
    reviews: 112,
    location: "Park Street, Kolkata",
    specialty: "Candid Wedding Photography",
    pricePerDay: 18000,
    experience: "12 years",
    more: 6
  }
];

router.get("/", async (req, res) => {
  try {

    res.json(photography);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
const foundPhoto = photography.find(v => v._id === id);
  if (!foundPhoto) {
    return res.status(404).json({ error: "Photo not found" });
  }
  res.json(foundPhoto);
});


export default router;
