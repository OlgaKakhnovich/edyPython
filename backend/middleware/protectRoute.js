import jwt from "jsonwebtoken"
import prisma from "../db/prisma.js";

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error:"You need to be logged in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }


      /*  console.log("Decoded userId:",typeof decoded.userId); 
        try {
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, username: true, email: true },
            });
        
            console.log("User found:", user);
        
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
        
            req.user = user;
            next();
        } catch (error) {
            console.error("Prisma error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
        */

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {id:true, username: true, email: true},
        });



        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRout middleware");
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default protectRoute;