import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChartBar, ChartLine } from "../components/BarChart";

const Chart = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const bgDiv = document.documentElement.className == 'themes-dracula' ? 'bg-base100' : 'bg-secondary';
    return (
        <div className={`w-screen h-screen ${bgDiv} flex items-center justify-center gap-5 px-20`}>
            <ChartBar setError={setError} setIsLoading={setIsLoading} />

            <ChartLine setError={setError} setIsLoading={setIsLoading} />
        </div>
    )
}

export default Chart;