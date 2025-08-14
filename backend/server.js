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
import themes from "./routes/themes.js";
import foods from "./routes/food.js";

dotenv.config();
const app=express();
const PORT=5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/login",login);
app.use("/auth",auth);
app.use("/api/venues",venue);
app.use("/api/categories",categories);
app.use("/api/themes", themes);
app.use("/api/foods",foods);


app.listen(PORT,() =>{
  console.log(`Server running on http://localhost:${PORT}`);
});




