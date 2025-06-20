import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Category from '../models/categoryData.js'; // Keep this for future DB use

const router = express.Router();

const categories = [
  {
    title: "VENUE",
    image: "https://via.placeholder.com/300?text=Venue"
  },
  {
    title: "PHOTOGRAPHY",
    image: "https://via.placeholder.com/300?text=Photography"
  },
  {
    title: "MUSIC & DANCE",
    image: "https://via.placeholder.com/300?text=Music+%26+Dance"
  },
  {
    title: "FOOD",
    image: "https://via.placeholder.com/300?text=Food"
  },
  {
    title: "HONEYMOON",
    image: "https://via.placeholder.com/300?text=Honeymoon"
  },
  {
    title: "THEME",
    image: "https://via.placeholder.com/300?text=Theme"
  },
  {
    title: "INVITATIONS",
    image: "https://via.placeholder.com/300?text=Invitations"
  },
  {
    title: "CHATS",
    image: "https://via.placeholder.com/300?text=Chats"
  }
];


router.get("/", async (req, res) => {
  try {
    // const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
