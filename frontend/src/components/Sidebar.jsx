import React, { useState, useEffect } from "react";
import Progress from "./Progress";
import { SquareTerminal, ChevronDown, ChevronUp, Keyboard, KeyboardOff, ChartBar } from 'lucide-react';
import { Link } from "react-router-dom";
import { fetchAllChapters } from "../data/useLevel";
import { useAuthContext } from "../context/AuthContext";
import { fetchRating } from "../data/useDates";
import { useProgress } from "../context/ProgressContext";

const Sidebar = ({ sidebar, setSidebar }) => {

    const [chapters, setChapters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openChapter, setOpenChapter] = useState(null);
    const { authUser } = useAuthContext();
    const [userRating, setUserRating] = useState(null);
    const { completed, fetchCompleted } = useProgress();

    useEffect(() => {
        const getChapters = async () => {
            try {
                const data = await fetchAllChapters();
                if (data && data.chapters) {
                    setChapters(data.chapters);
                } else {
                    throw new Error(error.message);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };


        getChapters();
    }, []);

    const toggleChapter = (chapterId) => {
        setOpenChapter(openChapter === chapterId ? null : chapterId);
    };

    useEffect(() => {
        const loadRating = async () => {
            const rating = await fetchRating();

            setUserRating(rating.rating);
        };

        loadRating();
    }, [authUser]);


    return (<>
        <aside className={`  ${!sidebar ? 'hidden' : '-translate-x-full'} fixed top-0 left-0 w-64 h-screen transition-transform sm:translate-x-0 z-40`} >
            <div className="h-full px-3 py-4 overflow-y-auto bg-base200 pt-16">
                <div className="">

                </div>
                <ul className="space-y-2 font-medium">
                    <li><Progress userRating={userRating} /></li>
                    <li>
                        <Link to="/free_space_to_code" className="flex items-center p-2 rounded-lg text-neutralContent hover:bg-neutral group">
                            <SquareTerminal />
                            <span className="ms-3">Wolna przestreń</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/charts" className="flex items-center p-2 rounded-lg text-neutralContent hover:bg-neutral group">
                            <ChartBar />
                            <span className="ms-3">Statystyki</span>
                        </Link>
                    </li>

                    <hr className="border-neutralContent" />

                    <ul>
                        {
                            chapters.map((chapter) => (
                                <li key={chapter.id}>
                                    <div className="flex items-center p-2 rounded-lg text-neutralContent group cursor-pointer" onClick={() => toggleChapter(chapter.id)}>
                                        <SquareTerminal />
                                        <div className="flex flex-col">
                                            <span className="ms-3">{chapter.title}</span>
                                            <span className="ms-3 text-baseContent text-xs">Moduł {chapter.id}</span>
                                        </div>
                                        {openChapter === chapter.id ? (
                                            <ChevronUp className="ml-auto" />
                                        ) : (
                                            <ChevronDown className="ml-auto" />
                                        )}
                                    </div>

                                    {
                                        openChapter === chapter.id && (
                                            <ul className=" py-2 space-y-2">
                                                {chapter.levels
                                                    .slice()
                                                    .sort((a, b) => a.id - b.id)
                                                    .map((level, index) => {
                                                        const isCompleted = completed.includes(level.id);

                                                        return (
                                                            <Link key={level.id} to={`/levels/${level.id}?chapterId=${chapter.id}`}
                                                                className={`flex items-center ms-8 p-2 rounded-lg text-neutralContent hover:bg-neutral group ${!isCompleted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                onClick={(e) => !isCompleted && e.preventDefault()}>
                                                                {isCompleted ? <Keyboard /> : <KeyboardOff />}
                                                                <div className="flex flex-col text-sm">
                                                                    <span className="ms-3">{`${level.title.slice(0, 15)}${level.title.length > 15 ? '...' : ''}`}</span>
                                                                    <span className="ms-3 text-baseContent text-xs">Poziom {index + 1}</span>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }
                                                    )}
                                            </ul>
                                        )}
                                </li>
                            ))
                        }
                    </ul>



                </ul>
            </div>
        </aside >
    </>)
}

export default Sidebar;

