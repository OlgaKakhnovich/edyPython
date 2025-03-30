import React from "react";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useTheme } from "../../context/ThemeContext";
import themes from "../../data/themes";

const OutputEditor = ({ output }) => {

    const { theme } = useTheme();
    const colorEditor = themes.find(themeObj => themeObj.name === theme)?.color;

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="border-neutral border-2  rounded-lg w-full h-full px-5 py-2 text-baseContent" style={{ backgroundColor: colorEditor }}>
                    {output}</div>
            </div>
        </>
    )

}

export default OutputEditor;
