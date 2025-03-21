import React from "react";
import Navbar from "../components/Navbar";
import ThemeController from "../components/ThemeController";
import CodeEditor from "../components/level/CodeEditor";
import { AlertError, AlertSuccess, AlertWarning } from "../components/Alert";
import Sidebar from "../components/Sidebar";
import Loading from "../components/LoadingBall";
import Level from "../components/level/Level";
import Profille from "../components/home/Profille";

const Home = () => {


    return (<>
        <Navbar />

        <Sidebar />
        <Profille />


    </>)
}

export default Home;
