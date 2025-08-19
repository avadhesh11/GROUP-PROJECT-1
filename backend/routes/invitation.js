import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Invitation from '../models/invitationData.js';
const router = express.Router();

    const invitation = [
          {
            _id: "1",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Elegant Gold Collection",
            rating: "4.8",
            reviews: "156",
            category: "Traditional",
            price: "2999",
            designs: "25",
            customizable: true,
            format: "Digital & Print",
            deliveryTime: "24 hours",
            designer: "Royal Designs"
          },
          {
            _id: "2",
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Floral Romance Suite",
            rating: "4.9",
            reviews: "203",
            category: "Floral",
            price: "3499",
            designs: "30",
            customizable: true,
            format: "Digital Only",
            deliveryTime: "12 hours",
            designer: "Bloom Studio"
          },
          {
            _id: "3",
            image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Modern Minimalist",
            rating: "4.7",
            reviews: "98",
            category: "Modern",
            price: "2499",
            designs: "18",
            customizable: true,
            format: "Print Only",
            deliveryTime: "48 hours",
            designer: "Clean Designs"
          },
          {
            _id: "4",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Royal Heritage",
            rating: "4.9",
            reviews: "187",
            category: "Traditional",
            price: "4999",
            designs: "40",
            customizable: true,
            format: "Digital & Print",
            deliveryTime: "24 hours",
            designer: "Heritage Arts"
          },
          {
            _id: "5",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Bohemian Dreams",
            rating: "4.6",
            reviews: "142",
            category: "Bohemian",
            price: "3299",
            designs: "22",
            customizable: true,
            format: "Digital Only",
            deliveryTime: "12 hours",
            designer: "Free Spirit"
          },
          {
            _id: "6",
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            title: "Classic Elegance",
            rating: "4.8",
            reviews: "234",
            category: "Classic",
            price: "3999",
            designs: "35",
            customizable: true,
            format: "Digital & Print",
            deliveryTime: "24 hours",
            designer: "Timeless Creations"
          }
        ];

router.get("/", async (req, res) => {
  try {
    res.json(invitation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
const foundInvitation = invitation.find(v => v._id === id);
  if (!foundInvitation) {
    return res.status(404).json({ error: "Invitation not found" });
  }
  res.json(foundInvitation);
});


export default router;
