import React from "react";
import { X } from "lucide-react";

const ChooseImg = ({ setInputs, inputs, isX, setShowChooseImg }) => {
    const bgDiv = document.documentElement.className == 'themes-dracula' ? 'bg-base100' : 'bg-secondary';
    const Div = document.documentElement.className == 'themes-dracula' ? 'bg-neutralContent' : 'bg-secondaryContent';
    const textDiv = document.documentElement.className == 'themes-dracula' ? 'text-neutralContent' : 'text-secondaryContent';
    const text = document.documentElement.className == 'themes-dracula' ? 'text-base100' : 'text-neutralContent';
    return (<>
        <div className={`${bgDiv} h-full w-full`}></div>
        <div className={`${Div} rounded-lg absolute z-50 top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 flex flex-col p-5 text-baseContext gap-y-3`}>
            {isX && <X className="absolute text-baseContent right-5 cursor-pointer"
                onClick={() => setShowChooseImg(false)} />}
            <h2 className={`text-center font-bold ${text} text-2xl`}>Wybierz zdjęcie profilowe</h2>
            <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto m-2 p-3">
                {Array.from({ length: 100 }, (_, i) => (
                    <img
                        key={i + 1}
                        className="size-20 rounded-full cursor-pointer hover:scale-110 transition-transform"
                        src={`https://avatar.iran.liara.run/public/${i + 1}`}
                        alt={`Avatar ${i + 1}`}
                        onClick={() => {
                            setInputs({ ...inputs, profilePic: `https://avatar.iran.liara.run/public/${i + 1}` });
                            if (isX) setShowChooseImg(false)
                        }}
                    />
                ))}
            </div>
        </div>
        <div className=""></div>
    </>)
}

export default ChooseImg;