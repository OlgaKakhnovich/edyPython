import React from "react";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';


const OutputEditor = () => {


    return (
        <>
            <div className="flex flex-col w-full h-full">
                <h2 className="text-neutralContent font-bold text-xl pb-4">Output</h2>
                <div className="bg-[#282a36] border-[#45495c] border-2  rounded-lg w-full h-full px-5 py-2 text-[#979dbc]">
                    output</div>
            </div>
        </>
    )

}

export default OutputEditor;
