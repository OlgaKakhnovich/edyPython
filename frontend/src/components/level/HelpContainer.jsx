import React from "react";

const HelpComponent = ({ setIsActive, text }) => {

    return (
        <div className="max-w-96  bg-base200 rounded-lg absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-5 text-baseContent gap-y-3">
            <h2 className="font-bold text-2xl  text-center">Wskazówka</h2>
            <div className="my-3">{text}</div>
            <div className="flex items-center justify-center">
                <button onClick={() => setIsActive(false)} className="h-10 w-28 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                    Rozumiem
                </button>
            </div>
        </div>
    )

}

export default HelpComponent;