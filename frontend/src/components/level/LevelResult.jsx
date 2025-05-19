import React, { useState } from "react";
import StarRating from "./StarRating";
import { useParams, useNavigate } from "react-router-dom";
import useProgressUpdate from "../../hooks/useProgressUpdate";
import { fetchOnlyChapter, onlySubmitTask } from "../../data/useLevel";
import { useProgress } from "../../context/ProgressContext";
import Loading from "../LoadingBall";


const LevelResult = ({ data, taskData, score, levelId, setIsLevelProgress }) => {

    const navigate = useNavigate();
    const { loading, update } = useProgressUpdate();
    const { fetchCompleted } = useProgress();

    const handleRetry = () => {
        window.location.reload();
    }

    const handleNextLevel = async () => {
        try {
            setIsLevelProgress(false);
            console.log("TaskData: ", taskData);
            await onlySubmitTask(levelId, taskData);
            await update(data);
            await fetchCompleted();
            const nextLevelId = Number(levelId) + 1;
            const newChapterId = await fetchOnlyChapter(nextLevelId);
            navigate(`/levels/${nextLevelId}?chapterId=${newChapterId}`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="bg-base200 rounded-lg absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-5 text-baseContext gap-y-3 border border-baseContent">
                {loading ? (<Loading />) : (
                    <>
                        <h1 className="text-center font-bold text-baseContent text-2xl">Gratulacja!</h1>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="text-baseContent text-xl pb-3">{score}</h2>
                            <StarRating score={score} />
                        </div>

                        <div className="flex items-center justify-around flex-row">
                            <button onClick={handleRetry} type="button" className="text-secondary hover:text-white border border-secondary hover:bg-secondaryHover font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Jeszcze raz</button>
                            <button onClick={handleNextLevel} type="button" className="text-white bg-secondary hover:bg-secondaryHover font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Dalej</button>
                        </div>
                    </>)}
            </div>

        </>
    )
}

export default LevelResult;