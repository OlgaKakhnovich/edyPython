import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const signup = async (req, res) =>{
  try{
    const {email, password, username, confirmPassword} = req.body;

    if(!email || !password || !confirmPassword || !username){
        return res.status(400).json({error: "Please fill all fields"});
    }

    if(password !== password){
        return res.status(400).json({error: "Password should be matched"});
    }

    const user = await prisma.user.findUnique({where:{email}});

    if(user){
        return res.status(400).json({error: "User with this email is already exists"});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const rand = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${rand}`

    const newUser = await prisma.user.create({
        data: {
            username, 
            email,
            password: hashedPassword,
            profilePic,
        }
    });

    if(newUser){

        generateToken(newUser.id, res);

        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    }else{
        res.status(400).json({error:"Invalid user data"});
    }

  }catch(error){
console.log("Error in signup controller", error.message);
res.status(500).json({error:"Internal Server Error"});
  };
}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(400).json({error:"Invalid email"});
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid password"});
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            username:user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = async (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
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
        });
        
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}