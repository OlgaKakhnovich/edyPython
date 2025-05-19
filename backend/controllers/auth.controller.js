import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const signup = async (req, res) =>{
  try{
    const {email, password, username, confirmPassword, profilePic} = req.body;

    if(!email || !password || !confirmPassword || !username){
        return res.status(400).json({error: "Wszyskie pola muszą być uzupełnione."});}

    if(password !== confirmPassword){ return res.status(400).json({error: "Hasła powinny być zgodne."});}

    const user = await prisma.user.findUnique({where:{email}});
    if(user){
        return res.status(400).json({error: "Użytkownik z takim adresem e-mail już istnieje."});}

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            username, 
            email,
            password: hashedPassword,
            profilePic,
        }
    });

    generateToken(newUser.id, res);
    res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        profilePic: newUser.profilePic,
        email: newUser.email,      
        createdAt: newUser.createdAt
    })
  }catch(error){
       console.log("Błąd w  kontrolerze rejestracji: ", error.message);
       res.status(500).json({error:"Wewntrzny błąd serwera."});
  };
}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where:{email}});
        
        if(!user){
            return res.status(400).json({error:"Użytkownik nie istnieje"});
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error: "Nieprawidłowe hasło"});
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            username:user.username,
            profilePic: user.profilePic,
            email: user.email,       
            createdAt: user.createdAt
        })

    } catch (error) {
        console.log("Błąd w kontrolerze logowania", error.message);
        res.status(500).json({error:"Wewnętrzny błąd serwera"});
    }
}

export const logout = async (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Wylogowano pomyślnie"});
    } catch (error) {
        console.log("Błąd w kontrolerze wylogowania", error.message);
        res.status(500).json({error:"Wewnętrzny błąd serwera"});
    }
}

export const getMe = async(req, res)=>{
    try {
        const user = await prisma.user.findUnique({where:{id:req.user.id}});

        if(!user){
            return res.status(400).json({error:"User not found"});
        }


        res.status(200).json({
            id: user.id,
            username: user.username,
            profilePic: user.profilePic,
            email: user.email,
            createdAt: user.createdAt,
        });
        
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const updateMe = async(req, res)=>{
    try {
        const {profilePic, username, id, updatedAt} = req.body;

       // console.log(req.body);

        try{
            const userExists = await prisma.user.findUnique({
                where:{id: Number(id)},
            });

            if(!userExists){
                return res.status(404).json({
                    success:false,
                    message: "User not found",
                });
            }


            const updateData = {
                    ...(profilePic && {profilePic}),
                    ...(username && {username}),
                    ...(updatedAt && {updatedAt}),
            }

            const updateUser = await prisma.user.update({
                where:{id:Number(id)},
                data: updateData,
            });

            res.status(200).json({
                success:true,
                data:updateUser,
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    }catch (error) {
        console.log("Error in updateMe controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getDates = async(req, res)=>{
    try {
       
        const user = req.user;

        if(!user?.id) return res.status(401).json({ error: 'Unauthorized' });

        const logins = await prisma.userLogin.findMany({
            where:{
                userId:user.id,
            },
            select:{
                loginDate:true,
            },
        });
        const dates = logins.map(entry=>entry.loginDate.toLocaleDateString());
        res.status(200).json({dates});
    } catch (error) {
        console.log("Error in getDates controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getRating = async(req, res)=>{
    try {
       
        const user = req.user;

        if(!user?.id) return res.status(401).json({ error: 'Unauthorized' });

        const ratings = await prisma.userLevelProgress.findMany({
            where:{
                userId:user.id,
            },
            select:{
                progress:true,
            },
        });

        if(ratings.length===0){
            return res.status(200).json({rating:0});
        }

        const totalProgress = ratings.reduce((acc, cur)=>acc+Number(cur.progress), 0);
        res.status(200).json({rating: totalProgress});
    } catch (error) {
        console.log("Error in getRating controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}