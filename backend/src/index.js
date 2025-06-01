import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import db from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import path from "path";

const app = express();

app.use("/auth", authRoutes);

app.listen(
    console.log(()=>"Server is running on port 3000")
)
