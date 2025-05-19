import React, { useState } from "react";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useTheme } from "../../context/ThemeContext";
import themes from "../../data/themes";
import AccordionTests from "./AccordionTests";

const OutputEditor = ({ output, tests, activeTab, setActiveTab, isComplited }) => {

    const { theme } = useTheme();
    const colorEditor = themes.find(themeObj => themeObj.name === theme)?.color;

    return (
        <>
            <nav className="relative z-0 flex border border-neutral rounded-xl overflow-hidden" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                <button
                    type="button"
                    className={`relative min-w-0 flex-1 bg-base200  border-x-2 first:border-s-0   ${activeTab === 'output' ? 'bg-neutral' : 'border-transparent'} py-2 px-4 text-baseContent text-sm font-medium text-center overflow-hidden focus:z-10  disabled:opacity-50 disabled:pointer-events-none`}
                    onClick={() => setActiveTab('output')}
                >
                    Wyjście
                </button>
                <button
                    type="button"
                    disabled={!isComplited}
                    className={`relative min-w-0 flex-1 bg-base200 border-x-2 first:border-s-0  ${activeTab === 'tests' ? 'bg-neutral' : 'border-transparent'} py-2 px-4 text-baseContent text-sm font-medium text-center overflow-hidden focus:z-10 disabled:opacity-50 disabled:pointer-events-none`}
                    onClick={() => setActiveTab('tests')}
                >
                    Testy
                </button>
            </nav>

            <div className="mt-3">
                {activeTab === 'output' && (
                    <div >
                        <div className="flex flex-col w-full">
                            <div className="border-neutral border-2  rounded-lg w-full h-40 px-5 py-2 text-baseContent" style={{ backgroundColor: colorEditor }}>
                                {output}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'tests' && (
                    <div className="border-neutral border-2 overflow-y-auto  rounded-lg w-full h-40 px-3 py-2 text-baseContent" style={{ backgroundColor: colorEditor }}>
                        <AccordionTests tests={tests} />
                    </div>

                )}

            </div>
        </>
    )

}

export default OutputEditor;
