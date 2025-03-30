import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Progress from "../components/Progress";
import ChooseImg from "../components/ChooseImg";
import Loading from "../components/LoadingBall";

const Home = () => {

    const { authUser, isLoading } = useAuthContext();
    const date = new Date(authUser?.createdAt);
    const formattedDate = date.toLocaleDateString();

    if (isLoading) {
        return <Loading />
    } else {
        return (<>
            <div className=" flex rounded-xl flex-row gap-x-6 ">
                <div className="flex flex-col gap-y-2">
                    <img className="size-44 rounded-full" alt="Extra large avatar" src={authUser.profilePic} />
                    <Progress />
                </div>
                <div className="flex gap-y-3 flex-col">
                    <div className="text-neutralContent block  ">
                        <h2 className="font-bold">Nickname:</h2>
                        <h3 className="">{authUser?.username}</h3>
                    </div>
                    <div className="text-neutralContent block">
                        <h2 className="font-bold">Email:</h2>
                        <h3 className="">{authUser?.email}</h3>
                    </div>
                    <div className="text-neutralContent block">
                        <h2 className="font-bold">Początek kodowania:</h2>
                        <h3 className="">{formattedDate}</h3>
                    </div>
                    <div className="flex">
                    </div>
                    <div className="h-12 cursor-pointer gap-2 flex items-center justify-center text-secondaryContent p-2 bg-secondary px-12 py-2 rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                        Edytuj
                    </div>
                </div>
            </div></>)
    }
}

export default Home;
