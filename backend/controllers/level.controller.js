import prisma from "../db/prisma.js";
import createDOMPurify from "dompurify";
import {JSDOM} from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const getAllLevels = async(req, res)=>{
    try {
        const levels = await prisma.level.findMany({
            include:{chapter: true},
        });

        if(!levels){
            return res.status(400).json({error:"Levels are not found"});
        }

        res.status(200).json({levels});
    } catch (error) {
        console.log("Error in level controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
} 

export const getAllChapters = async(req, res)=>{
    try {
        const chapters = await prisma.chapter.findMany({
            include:{levels: true},
        });

        console.log(chapters);

        if(!chapters){
            return res.status(400).json({error:"Levels are not found"});
        }

        res.status(200).json({chapters});
    } catch (error) {
        console.log("Error in level controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
} 


export const getLevel = async(req, res)=>{
    const {id} = req.params;
    try {
       const level =await prisma.level.findUnique({
        where:{id: Number(id)}, 
        include: {
            chapter: true,
            tasks: true,
            examples: true
        }
    });

       if(!level){
        return res.status(400).json({error:"Level not found"});
       }

       res.status(200).json({level});
    } catch (error) {
        console.log("Error in level controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
} 