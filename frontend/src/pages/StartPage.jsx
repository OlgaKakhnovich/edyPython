import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

const StartPage = () => {

    const bgDiv = document.documentElement.className == 'themes-dracula' ? 'bg-base100' : 'bg-secondary';
    const textDiv = document.documentElement.className == 'themes-dracula' ? 'text-neutralContent' : 'text-secondaryContent';
    const Div = document.documentElement.className == 'themes-dracula' ? 'bg-neutralContent' : 'text-secondaryContent';
    const inputBg = document.documentElement.className == 'themes-dracula' ? 'bg-gray' : 'bg-base200';
    const text = document.documentElement.className == 'themes-dracula' ? 'text-base100' : 'text-neutralContent';
    const textInput = document.documentElement.className == 'themes-dracula' ? 'text-base300' : 'text-neutralContent';


    return (<>
        <div className={`w-screen h-screen ${bgDiv} flex items-center justify-center gap-5`}>
            <Link
                to="/signup"
                className={` hover:scale-105 ${inputBg} ${textInput} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
            >
                Stworz konto
            </Link>

            <Link
                to="/login"
                className={` hover:scale-105 ${inputBg} ${textInput} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
            >
                Załoguj się
            </Link>


        </div>
    </>)
}

export default StartPage;