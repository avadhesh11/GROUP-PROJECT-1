import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import login from "./routes/login.js";
import home from"./routes/home.js" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import venue from "./routes/venue.js";
import categories from "./routes/categories.js";

dotenv.config();


const app=express();
const PORT=5000;


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/user')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use("/login",login);
app.use("/auth",auth);
app.use("/api/venues",venue);
app.use("/api/categories",categories);


app.listen(PORT,() =>{
  console.log(`Server running on http://localhost:${PORT}`);
});




