import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "../components/level/CodeEditor";
import OutputEditor from "../components/level/Output";
import { fetchLevel } from "../data/useLevel";
import { useParams } from "react-router-dom";
import HelpComponent from "../components/level/HelpContainer";
import { executeCode } from "../data/apiCode";
import Loading from "../components/LoadingBall";
import Article from "../components/level/Article";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";
import CodeExample from "../components/level/CodeExample";


const LevelPage = () => {

    const { id } = useParams();
    const [level, setLevel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActiveHelp, setIsActiveHelp] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || "theme-base");

    const editorRef = useRef(null);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("Naciśnij \"Kompiluj\" żeby zobaczyć wynik");
    const [isCodeLoading, setIsCodeLoading] = useState(false);


    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsCodeLoading(true);
            //  const testCases = "10";
            const { run: result } = await executeCode(sourceCode);
            setOutput(result.output);

        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        } finally {
            setIsCodeLoading(false);
        }
    }

    useEffect(() => {
        const getLevel = async () => {
            try {
                setIsLoading(true);
                const data = await fetchLevel(id);
                setLevel(data.level);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getLevel();


        /*  const renderArticle = () => {
              if (!level) return null ;
      
              const regex = /<component:CodeExample id="(\d+)" \/>/g;
              const parts = [];
              let lastIndex = 0;
              let match;
                
      
      
      
      
              //    const parts = level.description.split('<component:CodeExample />');
      
                  console.log(parts);
                  return parts.map((part, index) => {
                      if (index === parts.length - 1) {
                          return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                      } else {
                          return (<React.Fragment key={index}>
                              <div dangerouslySetInnerHTML={{ __html: part }} />
                              <CodeExample code={"dkdkd"} />
                          </React.Fragment>)
                      }
                  })
          }
      */

    })
    if (isLoading) {
        return <Loading />
    } else if (level) {

        return (<>
            <div className="grid grid-cols-2 grid-rows-[1fr_5fr_3fr_1fr] gap-x-5 gap-y-2 w-screen h-screen px-12 pt-16 pb-5">
                <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col">
                    <h1 className="font-bold text-3xl text-baseContent">{level.title}</h1>
                    <h2 className="text-lg text-gray-200 text-baseContent">{level.chapter.title}</h2>
                </div>
                <div className="col-start-1 col-end-2 row-start-2 row-end-5 overflow-y-auto overflow-x-auto text-baseContent">

                </div>
                <div className="col-start-2 col-end-3 row-start-1 row-end-2  flex flex-row justify-between items-center gap-2">
                    <h1 className="font-bold text-xl text-gray-200 "></h1>
                    <div className="flex flex-row items-center justify-end  gap-5">
                        <button onClick={() => setIsActiveHelp(true)} className="h-10 w-28 cursor-pointer flex items-center justify-center text-accentContent bg-accent rounded-3xl font-medium hover:bg-accentHover transition-all ease-in duration-200 active:scale-95">
                            Wskazówka
                        </button>
                        <button onClick={runCode} className="h-10 w-24 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                            {isCodeLoading ? <div
                                className="w-5 h-5 border-4 border-t-accent border-base200 rounded-full animate-spin"
                            ></div> : "Kompiluj"}
                        </button>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                    <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
                </div>
                <div className="col-start-2 col-end-3 row-start-3 row-end-4 ">
                    <OutputEditor output={output} />
                </div>
                <div className="col-start-2 col-end-3 row-start-4 row-end-5 flex items-center justify-between ">
                    <div>
                        <h3 className="font-bold text-gray-200 text-xl">0/3</h3>
                    </div>
                    <button className={`h-10 w-24 flex items-center justify-center text-secondaryContent rounded-3xl font-medium text-base transition-all ease-in duration-200 active:scale-95 bg-secondary`} >
                        Dalej
                    </button>
                </div>
                {isActiveHelp ? <HelpComponent setIsActive={setIsActiveHelp} text={"kskks"} /> : null}
            </div></>)
    }
}

export default LevelPage;