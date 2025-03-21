import React from "react";
import CodeEditor from "./CodeEditor";
import OutputEditor from "./Output";

const Level = () => {
    return (<>
        <div className="grid grid-cols-2 grid-rows-[1fr_5fr_3fr_1fr] gap-x-5 gap-y-2 w-screen h-screen px-12 pt-16 pb-5">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col text-white">
                <h1 className="font-bold text-3xl">Title</h1>
                <h2 className="text-lg text-gray-200">description</h2>
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-5 overflow-y-auto overflow-x-auto text-white">
                sda
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2  flex flex-row justify-between items-center gap-2">
                <h1 className="font-bold text-xl text-gray-200 ">Task</h1>
                <div className="flex flex-row items-center justify-end  gap-5">
                    <button className="h-10 w-28 cursor-pointer flex items-center justify-center text-accentContent bg-accent rounded-3xl font-medium hover:bg-accentHover transition-all ease-in duration-200 active:scale-95">
                        Wskazówka
                    </button>
                    <button className="h-10 w-24 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                        Kompiluj
                    </button>
                </div>
            </div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                <CodeEditor />
            </div>
            <div className="col-start-2 col-end-3 row-start-3 row-end-4 ">
                <OutputEditor />
            </div>
            <div className="col-start-2 col-end-3 row-start-4 row-end-5 flex items-center justify-between ">
                <div>
                    <h3 className="font-bold text-gray-200 text-xl">0/3</h3>
                </div>
                <button className={`h-10 w-24 flex items-center justify-center text-secondaryContent rounded-3xl font-medium text-base transition-all ease-in duration-200 active:scale-95 bg-secondary`} >
                    Dalej
                </button>
            </div>

        </div></>)
}

export default Level;
