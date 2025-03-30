import React, { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import themes from "../data/themes";
import { useTheme } from "../context/ThemeContext";

const ThemeSelector = () => {

    const [dropdown, setDropdown] = useState(false);
    const { switchTheme } = useTheme();


    return (<><div className="relative flex items-center">
        <button type="button" onClick={() => setDropdown(!dropdown)} className="relative hover:scale-110 transition-transform -translate-x-full sm:translate-x-0">
            <Palette className="text-neutralContent" />
        </button>
        {dropdown &&
            <div className="absolute bg-base200 z-10 right-0 top-3/4 mt-2 p-2 rounded-lg w-56">
                {themes.map((theme, i) => (
                    <div key={i} className="flex items-center justify-between p-2 cursor-pointer hover:bg-base300 rounded-md my-1" onClick={() => switchTheme(theme.name)}>
                        <span className="text-neutralContent">{theme.title}</span>
                        <div className={`flex items-center justify-evenly gap-1 ${theme.name}`} >
                            <span className="size-4 inline-block bg-primary rounded-full border border-baseContent "></span>
                            <span className="size-4 inline-block bg-secondary rounded-full  border border-baseContent"></span>
                            <span className="size-4 inline-block bg-accent rounded-full  border border-baseContent"></span>
                            <span className="size-4 inline-block bg-base100 rounded-full  border border-baseContent"></span>
                        </div>
                    </div>
                ))}
            </div>
        }
    </div></>);
}

export default ThemeSelector;