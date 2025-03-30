import React from "react";
import { Code, Braces, Ampersands } from "lucide-react";

const ChooseDifficulty = ({ setInputs, inputs }) => {

    console.log(inputs);
    return (<>
        <div className="bg-base200 rounded-lg absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-3 p-5">
            <h1 className="font-bold text-baseContent text-xl block text-center">Wybierz poziom trudności</h1>
            <hr className="text-baseContent"></hr>
            <div onClick={() => setInputs({ ...inputs, difficulty: 1 })} className="flex cursor-pointer flex-row items-center gap-x-4 justify-start bg-base100 border border-base300 rounded-xl p-2 md:p-5 hover:scale-105  transition-transform -translate-x-full sm:translate-x-0 ">
                <Code className="text-baseContent" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-baseContent">Wprowadzenie </span>
                    <p>Poziom 1</p>
                </div>
            </div>
            <div onClick={() => setInputs({ ...inputs, difficulty: 2 })} className="flex cursor-pointer flex-row items-center gap-x-4 justify-start bg-base100 border border-base300 rounded-xl p-2 md:p-5 hover:scale-105  transition-transform -translate-x-full sm:translate-x-0">
                <Braces className="text-baseContent" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-baseContent">Pierwsze wyzwania</span>
                    <p>Poziom 2</p>
                </div>
            </div>
            <div onClick={() => setInputs({ ...inputs, difficulty: 3 })} className="flex cursor-pointer flex-row items-center gap-x-4 justify-start bg-base100 border border-base300 rounded-xl p-2 md:p-5 hover:scale-105  transition-transform -translate-x-full sm:translate-x-0">
                <Ampersands className="text-baseContent" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-baseContent">Początkujący developer</span>
                    <p>Poziom 3</p>
                </div>
            </div>
        </div>

    </>)

}

export default ChooseDifficulty;