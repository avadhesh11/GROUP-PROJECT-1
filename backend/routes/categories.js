import express from "express";
import Category from '../models/categoryData.js'; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
   const categories = await Category.find();
   
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
