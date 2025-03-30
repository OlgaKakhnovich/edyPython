import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const LevelsContext = createContext({
    levels: [],
    setLevels: () => { },
    isLoading: true,
})

export const LevelsContextProvider = ({ children }) => {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const res = await fetch("/api/levels");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setLevels(data);
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLevels();
    }, []);

    return (
        <LevelsContext.Provider value={{ levels, setLevels, isLoading }}>
            {children}
        </LevelsContext.Provider>
    )
}

export function useLevelsContext() {
    return useContext(LevelsContext);
}