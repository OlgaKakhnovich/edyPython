import React from "react";
import { Star } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const Progress = ({ userRating }) => {
    const { authUser, isLoading } = useAuthContext();

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }
    else if (!authUser) {
        return <div className="p-4">No user data</div>;
    }
    else {
        return (<>
            <div className="flex items-center gap-3 p-4">
                <span className="text-lg font-semibold text-baseContent">Progres: </span>
                <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-baseContent">{userRating}</span>
                </div>
            </div></>)
    }
}

export default Progress;