import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app=express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, ()=>{
    console.log("Server is opening and running on port 5000");
})