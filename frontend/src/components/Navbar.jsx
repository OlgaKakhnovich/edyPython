import React from "react";
import { Menu, Palette, X, LogOut, Settings, CircleUserRound } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useLogOut from "../hooks/useLogOut";
import { useAuthContext } from "../context/AuthContext";
import ThemeSelector from "./ThemeSelector";



const Navbar = ({ sidebar, setSidebar }) => {

    const [dropdown, setDropdown] = useState(false);
    const { logout } = useLogOut();
    const { authUser, isLoading } = useAuthContext();

    return (<> <nav className="bg-base200 w-screen fixed top-0 z-50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
                {sidebar ? <X className="text-baseContent cursor-pointer" onClick={() => setSidebar(!sidebar)} /> : <Menu className="text-baseContent cursor-pointer" onClick={() => setSidebar(!sidebar)} />}
                <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <ThemeSelector />
                    <div className="relative ml-3">
                        <div>
                            <button type="button" className="relative flex" id="user-menu-button" onClick={() => setDropdown(!dropdown)}>
                                <img className="size-8 rounded-full" src={authUser?.profilePic} />
                            </button>
                        </div>

                        {dropdown &&
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base200 py-3 ring-1 shadow-lg ring-black/5 focus:outline-hidden" >
                                <Link to="/" onClick={() => setDropdown(false)} className="flex justify-between items-center px-2 py-2 text-neutralContent cursor-pointer rounded-md mx-3 hover:bg-base300" >
                                    <p className="text-base">Mój profil</p>
                                    <CircleUserRound className="text-xs" />
                                </Link>
                                <a className="flex justify-between items-center px-2 py-2 text-neutralContent cursor-pointer rounded-md mx-3 hover:bg-base300" onClick={logout}>
                                    <p className="text-base">Log out</p>
                                    <LogOut className="text-xs" />
                                </a>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>

    </nav>
    </>)
}

export default Navbar;