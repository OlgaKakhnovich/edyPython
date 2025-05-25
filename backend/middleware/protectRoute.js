import jwt from "jsonwebtoken"
import prisma from "../db/prisma.js";
import { startOfDay } from "date-fns"; 

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){return res.status(401).json({error:"Musisz być zalogowany."});}

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {return res.status(401).json({ error: "Nieautoryzowany użytkownik." });}

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {id:true, username: true, email: true},
        });

        if (!user) { return res.status(404).json({ error: "Użytkownik nie został znaleziony." }); }
        req.user = user;

        const today = startOfDay(new Date());
        await prisma.userLogin.upsert({
            where:{
                userId_loginDate: {
                    userId: user.id,
                    loginDate: today,
                },
            },
            update:{},
            create:{
                userId:user.id,
                loginDate:today,
            },
        });

        next();
    } catch (error) {
        console.log("Błąd w protectRout middleware: ", error);
        res.status(500).json({error:"Węwnętrzny błąd serwera."});
    }
}

export default protectRoute;