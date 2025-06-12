import React from "react";
import { Link } from "react-router-dom";

const InDevelopment = () => {

    return (
        <>
            <div className="flex flex-col gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-center font-bold text-3xl text-baseContent">Jeszcze chwilka!</h2>
                <div className="flex flex-col gap-2">
                    <p className="font-medium text-base text-baseContent">Ten poziom dopiero się tworzy. Już nie możemy się doczekać, żeby ci pokazać.</p>
                    <p className="font-medium text-base text-baseContent">Wracaj do nas wkrótce.</p>
                </div>
                <Link to="/" className="h-10 w-full flex items-center justify-center text-secondaryContent rounded-3xl font-medium text-base transition-all ease-in duration-200 active:scale-95 bg-secondary hover:bg-secondaryHover cursor-pointer">Mój profil</Link>
            </div>
        </>
    )
}

export default InDevelopment;