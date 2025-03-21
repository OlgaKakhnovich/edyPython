import React from "react";
import Progress from "../Progress";

const Profille = () => {
    return (<>
        <div className=" flex rounded-xl flex-row gap-x-6 ">
            <div className="flex flex-col gap-y-2">
                <img className="rounded w-44 h-44 bg-slate-100 mb-2" src="" alt="Extra large avatar" />
                <Progress />
            </div>
            <div className="flex gap-y-3 flex-col">
                <div className="text-neutralContent block  ">
                    <h2 className="font-bold">Nickname:</h2>
                    <h3 className="">nickname</h3>
                </div>
                <div className="text-neutralContent block">
                    <h2 className="font-bold">Email:</h2>
                    <h3 className="">email</h3>
                </div>
                <div className="text-neutralContent block">
                    <h2 className="font-bold">Początek kodowania:</h2>
                    <h3 className="">19.08.2004</h3>
                </div>
                <div className="flex">
                </div>
                <div className="h-12 cursor-pointer gap-2 flex items-center justify-center text-neutralContent p-2 bg-secondary px-12 py-2 rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                    Edytuj
                </div>
            </div>
        </div></>)
}

export default Profille;