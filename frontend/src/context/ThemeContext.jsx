import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-base");

    const switchTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.className = newTheme;
    };

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}