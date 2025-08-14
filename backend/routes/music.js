import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Music from '../models/musicData.js';
const router = express.Router();

const music = [
  {
    _id: "1",
    title: "Melody Makers Band",
    image: "https://via.placeholder.com/400x250",
    rating: 4.8,
    reviews: 120,
    location: "Bandra, Mumbai",
    specialty: "Live Wedding Band",
    pricePerEvent: 25000,
    experience: "15 years",
    more: 5
  },
  {
    _id: "2",
    title: "Sitar & Strings",
    image: "https://via.placeholder.com/400x250",
    rating: 4.6,
    reviews: 95,
    location: "Connaught Place, Delhi",
    specialty: "Classical Instrumental Music",
    pricePerEvent: 18000,
    experience: "10 years",
    more: 4
  },
  {
    _id: "3",
    title: "Dance Beats Crew",
    image: "https://via.placeholder.com/400x250",
    rating: 4.9,
    reviews: 140,
    location: "Park Street, Kolkata",
    specialty: "Bollywood Dance Performances",
    pricePerEvent: 20000,
    experience: "8 years",
    more: 6
  }
];

router.get("/", async (req, res) => {
  try {
    res.json(music);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
