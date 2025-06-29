import React, { useRef, useState } from "react";
import CodeEditor from "../components/level/CodeEditor";
import { useTheme } from "../context/ThemeContext";
import themes from "../data/themes";
import { runCode } from "../data/runCode";



const FreeSpace = () => {

    const editorRef = useRef();
    const [isCodeLoading, setIsCodeLoading] = useState(false);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("Naciśnij \"Kompiluj\" żeby zobaczyć wynik");


    const { theme } = useTheme();
    const colorEditor = themes.find(themeObj => themeObj.name === theme)?.color;

    const run = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsCodeLoading(true);
            const { run: result } = await runCode(sourceCode);
            setOutput(result.output);
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        } finally {
            setIsCodeLoading(false);
        }
    }

    console.log(output);
    return (<>
        <div className="grid grid-cols-2 grid-rows-[0.2fr_2fr] gap-x-2.5 gap-y-1.5 w-screen h-screen px-10 pt-16 pb-5">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-row items-center justify-between">
                <h1 className="font-bold text-2xl text-baseContent">Wolna przestrzeń</h1>
                <button onClick={run} className="h-10 w-24 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                    {isCodeLoading ? <div
                        className="w-5 h-5 border-4 border-t-accent border-base200 rounded-full animate-spin"
                    ></div> : "Kompiluj"}
                </button>
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-3">
                <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-3">

                <div className="border-neutral border-2  h-full rounded-lg w-full px-5 py-2 text-baseContent" style={{ backgroundColor: colorEditor }}>
                    {output}</div>


            </div>
        </div>

    </>)
}

export default FreeSpace;
