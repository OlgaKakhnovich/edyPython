import React from "react";
import { Menu } from 'lucide-react';
import { Palette } from 'lucide-react';
import { X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


const Navbar = () => {

    return (<> <nav className="bg-base200 w-screen fixed top-0 z-50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
                <Menu className="text-baseContent cursor-pointer" />





                <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" className="relative ">
                        <Palette className="text-baseContent" />
                    </button>


                    <div className="relative ml-3">
                        <div>
                            <button type="button" className="relative flex" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    </nav>
    </>)
}

export default Navbar;

/* <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base200 py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            <a href="#" className="block px-4 py-2 text-sm text-neutralContent" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutralContent" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutralContent" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                        </div>*/