import React from "react";

const Progress = () => {
    return (<>
        <div className="py-3">
            <div className="flex justify-between items-center  pb-2">
                <h3 className="text-md text-neutralContent font-bold">Progress: </h3>
                <span className="text-sm font-medium text-neutralContent">45%</span>
            </div>
            <div className="w-full rounded-full h-2.5 bg-base300">
                <div className="bg-secondaryHover h-2.5 rounded-full w-[45%]"></div>
            </div>
        </div></>)
}

export default Progress;