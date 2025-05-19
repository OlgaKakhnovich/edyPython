import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const fetchAllLevels = async()=>{
    try {
        const res = await fetch("/api/levels");
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

export const fetchAllChapters = async()=>{
    try {
        const res = await fetch("/api/levels/chapters");
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

export const fetchOnlyChapter = async(id)=>{
    try {
        const res = await fetch(`/api/levels/${id}/chapter`);
        const data = await res.json();
        
        if(!res.ok){
            throw new Error(data.error);
        }
        return data.chapterId;

    } catch (error) {
          console.error(error);
          toast.error(error.message);
    }
}

export const fetchCompletedLevels = async(id)=>{
    try {
        const res = await fetch(`/api/levels/completedLevels/${id}`);
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
}

export const fetchLevel = async(id)=>{
    try {
        
        const res = await fetch(`/api/levels/${id}`);
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

export const fetchTask = async(id, datas)=>{
    try {
        
        console.log(datas);
        const res = await fetch(`/api/levels/${id}/task`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(datas),
        }
        );
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

export const fetchTests = async(id)=>{
    try{
        const res = await fetch(`/api/levels/task/${id}`);
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }

        return data;
    }catch(error){
        console.error(error);
        toast.error(error.message);
        return [];
    }
}

export const fetchNextTaskAfterSubimt = async(id, datas)=>{ 
    try{
        const res=await fetch(`/api/levels/${id}/task/submit`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(datas),
        });

        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    }catch(error){
        console.log(error);
        toast.error(error.message);
    }
}

export const onlySubmitTask = async(id, datas)=>{
    try{
        const res=await fetch(`/api/levels/${id}/task/onlySubmit`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({tasks:datas}),
        });

        const data = await res.json();
        console.log(data);
        if(!res.ok){
            throw new Error(data.error);
        }
        return data;
    }catch(error){
        console.log(error);
        toast.error(error.message);
    }
}