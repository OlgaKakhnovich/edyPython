import React from "react";

const Loading = () => {
    return (<div className="flex flex-row gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-secondary animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-secondaryHover animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:-.5s]"></div>
    </div>)
}

export default Loading;