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