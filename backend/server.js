import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import levelsRoutes from "./routes/levels.routes.js";
import path from "path";

dotenv.config();

const app=express();

const PORT = process.env.PORT ;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/levels", levelsRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
    })
}

app.listen(PORT, ()=>{
    console.log("Server is opening and running on port " + PORT);
});