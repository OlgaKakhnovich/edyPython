import { fetchCompletedLevels } from "../data/useLevel";
import { useState, createContext, useContext, useEffect } from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);
export const ProgressProvider = ({ children, userId }) => {
    const [completed, setCompleted] = useState([]);

    const fetchCompleted = async () => {
        const data = await fetchCompletedLevels(userId);
        setCompleted(data);
    };


    useEffect(() => {
        if (userId) fetchCompleted();
    }, [userId]);

    return (
        <ProgressContext.Provider value={{ completed, fetchCompleted }}>
            {children}
        </ProgressContext.Provider>
    );
};