import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const router = express.Router();
router.get("/",(req,res)=>{
res.send("HELLO");
}
);
export default router;
