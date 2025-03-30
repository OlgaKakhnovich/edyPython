import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import levelsRoutes from "./routes/levels.routes.js";
import createDOMPurify from "dompurify";
import {JSDOM} from "jsdom";
dotenv.config();

const app=express();
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/levels", levelsRoutes);

app.listen(PORT, ()=>{
    console.log("Server is opening and running on port " + PORT);
})