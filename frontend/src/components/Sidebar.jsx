import React from "react";
import Progress from "./Progress";
import { SquareTerminal, Users, ChevronDown, ChevronUp, SquareCheck } from 'lucide-react';
import { Link, BrowserRouter } from "react-router-dom";

const Sidebar = () => {
    return (<>
        <aside className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-base200 pt-16">
                <div className="">
                    <Progress />
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/" className="flex items-center p-2 rounded-lg text-neutralContent hover:bg-neutral group">
                            <SquareTerminal />
                            <span className="ms-3">Wolna przestreń</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 rounded-lg text-neutralContent hover:bg-neutral group">
                            <Users />
                            <span className="ms-3">Turniej kodowania</span>
                        </Link>
                    </li>

                    <hr className="border-neutralContent" />
                    <ul>
                        <li>
                            <div to="/" className="flex items-center p-2 rounded-lg text-neutralContent group cursor-pointer">
                                <SquareTerminal />
                                <div className="flex flex-col">
                                    <span className="ms-3">Title</span>
                                    <span className="ms-3 text-baseContent text-xs">Shapter 1</span>
                                </div>
                                <ChevronDown className="fixed right-5" />
                            </div>
                            <ul id="dropdown-example" className=" py-2 space-y-2">
                                <Link to="/" className="flex items-center ms-8 p-2 rounded-lg text-neutralContent hover:bg-neutral group">
                                    <SquareCheck />
                                    <div className="flex flex-col text-sm">
                                        <span className="ms-3">Title</span>
                                        <span className="ms-3 text-baseContent text-xs">level 1</span>
                                    </div>
                                </Link>
                            </ul>
                        </li>
                    </ul>

                </ul>
            </div>
        </aside >
    </>)
}

export default Sidebar;

