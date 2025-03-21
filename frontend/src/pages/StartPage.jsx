import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

const StartPage = () => {

    return (<>
        <Link
            to="/signup"
            className="text-base100 bg-gradient-to-br from-primary to-secondary hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
            Stworz konto
        </Link>

        <Link
            to="/login">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-baseContent rounded-lg group bg-gradient-to-br from-primary to-secondary group-hover:from-primary group-hover:to-secondary hover:text-base100 focus:ring-4 focus:outline-none">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-base100  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Załogój się
                </span>
            </button>
        </Link>
    </>)
}

export default StartPage;