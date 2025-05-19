import toast from "react-hot-toast";

export const fetchDates = async()=>{
    try{
        const res = await fetch("/api/auth/visited_dates",{
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }
        return data.dates;
    }catch(error){
        console.log(error);
        toast.error(error.message);
    }
}

export const fetchRating = async()=>{
    try{
        const res = await fetch("/api/auth/rating",{
            method: 'GET',
            credentials:'include',
        });
    
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error);
        }

        return data;
    }catch(error)  {
        console.log(error);
        toast.error(error.message);
    }
}