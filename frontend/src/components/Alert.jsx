import React from "react";
import { OctagonX, OctagonAlert, BadgeCheck } from 'lucide-react';

export const AlertWarning = () => {

    return (<div className="bg-warning flex flex-row items-center justify-center fixed top-0 left-1/2 z-50 h-7  py-5 px-3 mt-5 rounded-lg text-neutralContent gap-3 transform -translate-x-1/2 a">
        <OctagonAlert className="text-warningContent" />
        <h3 className="text-warningContent" >message</h3>
    </div>)
}

export const AlertError = () => {
    return (<div className="bg-error flex flex-row items-center justify-center fixed top-0 left-1/2 z-50 h-7  py-5 px-3 mt-5 rounded-lg text-neutralContent gap-3 transform -translate-x-1/2 a">
        <OctagonX />
        <h3 >message</h3>
    </div>)
}

export const AlertSuccess = () => {
    return (
        <div className="bg-success flex flex-row items-center justify-center fixed top-0 left-1/2 z-50 h-7  py-5 px-3 mt-5 rounded-lg text-neutralContent gap-3 transform -translate-x-1/2 a">
            <BadgeCheck />
            <h3 >message</h3>
        </div>
    )
}
