
import { executeCodeWithTests } from "../../frontend/src/data/apiCodeWithTests.js";
import prisma from "../db/prisma.js";


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

        if(!chapters){
            return res.status(400).json({error:"Levels are not found"});
        }

        res.status(200).json({chapters});
    } catch (error) {
        console.log("Error in level controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
} 


export const getChapterByLevelId = async(req, res)=>{
    const {id:levelId} = req.params;
    try{
          const level = await prisma.level.findUnique({
          where: {
               id: Number(levelId),
          },
          select: {
               chapterId: true,
          },
          });

    if(!level){
        return res.status(400).json({error:"ChapterId not found"});
    }

         res.status(200).json({chapterId: level.chapterId});
    }catch(error){
        console.log("Error in chapter ", error.message);
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

export const getLevelsProgress = async(req, res)=>{
    try {
         const userId = req.user.id;
         const progresses = await prisma.userLevelProgress.findMany({
            where: { userId: Number(userId) },
            select: {
                date: true,
                progress: true,
                level:{
                    select:{
                        id:true,
                        chapterId: true,
                    },
                },
            },
        });

       const progressInLevel = progresses.map((entry) => ({
            levelId: entry.level.id,
            chapterId: entry.level.chapterId,
            date: entry.date,
            progress: entry.progress,
        }));

          progressInLevel.sort((a,b)=>a.levelId-b.levelId);
            res.status(200).json({progressInLevel});
    } catch (error) {
        console.log("Error in level controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getChaptersProgress = async(req, res)=>{
    try{
        const userId = req.user.id;
        const progresses = await prisma.userChapterRating.findMany({
            where:{userId: Number(userId)},
            select:{
                rating: true,
                chapterId: true,
            },
        });
        console.log(progresses);
        res.status(200).json({progresses});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getTests = async(req, res)=>{
    const {id} = req.params;

    try {
        const tests = await prisma.test.findMany({
            where: {id:Number(id)},
        });

        res.status(200).json(tests);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
        
    }
}

export const getCompletedLevels = async(req,res)=>{
    const {id} = req.params;

    try {
        const completed = await prisma.userLevelProgress.findMany({
            where:{userId:Number(id)},
            select:{levelId: true},
        });

        const levelIds = completed.map(level => level.levelId);

        const allLevels = await prisma.level.findMany({
            orderBy: { id: 'asc' },
            select: { id: true },
        });

        const allLevelIds = allLevels.map(level => level.id);

        if (levelIds.length === 0) {
            return res.json(allLevelIds.length > 0 ? [allLevelIds[0]] : []);
        }

        levelIds.sort((a, b) => a - b);

        const lastCompleted = levelIds[levelIds.length - 1];
        const nextLevel = allLevelIds.find(id => id > lastCompleted);

        if (nextLevel) {
            levelIds.push(nextLevel);
        }

        const uniqueSortedLevels = Array.from(new Set(levelIds)).sort((a, b) => a - b);

        res.json(uniqueSortedLevels);

    } catch (error) {
         console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const postExecute = async(req, res)=>{
    const {sourceCode} = req.body;
    const {id} = req.params;

    try {
        const results  = await executeCodeWithTests(sourceCode, Number(id));
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const addProgress = async(req, res) =>{
    try{
        const userId = req.user.id;
        const {progress, levelId, date} = req.body;

        const userExist = await prisma.user.findUnique({
            where:{id:Number(userId)},
        });

        if(!userExist){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        const existingProgress = await prisma.userLevelProgress.findUnique({
            where: {
                userId_levelId: {
                    userId: Number(userId),
                    levelId: Number(levelId),
                },
            },
        });

        if(existingProgress){
        await prisma.userLevelProgress.update({
            where:{
                userId_levelId:{
                    userId,
                    levelId: Number(levelId),
                },
            },
            data:{
                date,
                progress: progress >=existingProgress.progress ? progress : existingProgress.progress,
            },
        });
    }else{
        await prisma.userLevelProgress.create({
                data: {
                    userId: Number(userId),
                    levelId: Number(levelId),
                    progress,
                    date,
                },
            });
    }

       return res.status(200).json({
            success: true,
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

const getNextTask = async (userId, allTasks, chapterId, lastTaskId = null, recentCompletedTaskIds=[] )=>{

      const levelsInChapter = await prisma.level.findMany({
            where:{chapterId: Number(chapterId)},
            include:{tasks:true,},
        });

    
    const allTasksInChapter = levelsInChapter.flatMap(level =>level.tasks);

    const taskAttempt = await prisma.taskAttempt.findMany({
        where:{
            userId,
            taskId:{ in:allTasksInChapter.map(task=>task.id),},
        },
        include:{ task:true,},
    });

    const completedIds = new Set([
        ...taskAttempt.map(a=>a.taskId),
        ...recentCompletedTaskIds.map(id => Number(id))]);

    const remainingTasks = allTasks.filter(task=>!completedIds.has(task.id));

    let lastAttempt = null;
       if (lastTaskId) {
        lastAttempt = taskAttempt.find(a => a.taskId === Number(lastTaskId));
    }
   // const lastAttempt = lastTaskId ? taskAttempt.find(a=>a.taskId === Number(lastTaskId)) : null;

    const historySkill = getSkillFromAttempt(taskAttempt);
    let targetDifficulty;

    if(lastAttempt){
        const {attempts, hintUsed, task} = lastAttempt;
        const solvedWell = !hintUsed && attempts<=3;
        targetDifficulty = task?.difficulty ?? 50;
        targetDifficulty += (solvedWell ? 10 : -10);
    }else{
        targetDifficulty = historySkill;
    }

    targetDifficulty = Math.max(0, Math.min(100, targetDifficulty));

    if(lastTaskId!==null){
    await prisma.userChapterRating.upsert({
        where:{
            userId_chapterId:{
                userId, 
                chapterId:Number(chapterId)},
        },
        update:{rating: historySkill},
        create:{
            userId,
            chapterId: Number(chapterId),
            rating:historySkill,
        },
    });}

    remainingTasks.sort(
        (a,b)=>
        Math.abs(a.difficulty - targetDifficulty)-
        Math.abs(b.difficulty - targetDifficulty));
    
    return remainingTasks[0] || null;
}
/*
const getSkillFromAttempt = (attempts)=>{
    const effective = attempts.filter(a=>!a.hintUsed && a.attempts <=3);
    if(effective.length === 0 ) return 50;

    const avg = effective.reduce((sum, a)=>sum + a.task.difficulty, 0)/effective.length;
    return Math.round(avg);
}*/


const getSkillFromAttempt = (attempts)=>{
    if(attempts.length === 0 ) return 60;
    const avg = attempts.reduce((sum, a)=>sum + a.task.difficulty, 0)/attempts.length;
    return Math.round(avg);
}

export const submitAndTakeNextTask = async(req, res)=>{
    try{
        const {id:levelId} = req.params;
        const userId = req.user.id;
        const { hintsUsed, attempts, taskId, chapterId, taskInd} = req.body;

        
        const allTasks = await prisma.task.findMany({
            where:{levelId: Number(levelId)}
        });

        if(taskId!==null){
            await prisma.taskAttempt.upsert({
               where:{
                    userId_taskId:{
                        userId,
                        taskId:Number(taskId),
                     },
                },
               update:{
                    attempts: attempts,
                    hintsUsed:hintsUsed,
                },

               create:{
                     userId,
                     taskId: Number(taskId),
                     attempts,
                      hintsUsed,
                },
            });
        }

        let newTaskInd;
        if(taskInd===null) newTaskInd=1;
        else newTaskInd=taskInd+1;
        console.log("TaskInd: ", newTaskInd);

        const task = await getNextTask(userId, allTasks, chapterId, taskId);
        return res.json({task: task, taskInd: newTaskInd});
    }catch(error){
     console.error("Error in submitAndTakeNextTask:", error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    }
}


export const submitTask = async(req, res)=>{
    try{
        const userId = req.user.id;
        const {tasks} = req.body;

        console.log("Tasks: ", tasks);

        if(!Array.isArray(tasks) || tasks.length === 0){
            return res.status(400).json({
                success: false,
                message: "Nie podano żadnych zadań.",
            });
        };

        const operations = tasks
        .filter(task=>task.taskId !==null)
        .map(task=>
            prisma.taskAttempt.upsert({
                where:{
                    userId_taskId:{
                        userId,
                        taskId:Number(task.taskId),
                     },
                },
               update:{
                    attempts: task.attempts,
                    hintsUsed:task.hintsUsed,
                },
               create:{
                     userId,
                     taskId: Number(task.taskId),
                     attempts: task.attempts,
                     hintsUsed: task.hintsUsed,
                },
            })
        );

        await Promise.all(operations);
       
        return res.json({
        success: true,
        message: "Zadania zapisane pomyślne",
      });
        
    }catch(error){
     console.error("Error in submitAndTakeNextTask:", error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    }
}

export const getTask=async (req, res)=>{
        try{
        const {id:levelId} = req.params;
        const userId = req.user.id;
        const {taskId, chapterId, taskInd, recentCompletedTaskIds = []} = req.body;

        const allTasks = await prisma.task.findMany({
            where:{levelId: Number(levelId)}
        });

        let newTaskInd = (typeof taskInd === "number") ? taskInd + 1 : 1;
         if (newTaskInd > 3) {
      newTaskInd = 1;
    }
       
        const task = await getNextTask(userId, allTasks, chapterId, taskId, recentCompletedTaskIds);
        return res.json({task, taskInd: newTaskInd});
    }catch(error){
     console.error("Error in submitAndTakeNextTask:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    }
}