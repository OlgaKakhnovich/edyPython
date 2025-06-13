import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Progress from "../components/Progress";
import Loading from "../components/LoadingBall";
import UpdateProfile from "../components/UpdateProfile";
import { fetchRating } from "../data/useDates";
import Calendar from "../components/Calendar";

const Home = () => {

    const { authUser, isLoading } = useAuthContext();
    const date = new Date(authUser?.createdAt);
    const formattedDate = date.toLocaleDateString();
    const [userRating, setUserRating] = useState(null);

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    useEffect(() => {
        const loadRating = async () => {
            const rating = await fetchRating();

            setUserRating(rating.rating);
        };

        loadRating();
    }, [authUser]);

    if (isLoading) {
        return <Loading />
    } else {
        return (<>
            <div className=" flex rounded-xl flex-row gap-x-6 ">
                <div className="flex flex-col gap-y-2">
                    <img className="size-44 rounded-full" alt="Extra large avatar" src={authUser.profilePic} />
                    <Progress userRating={userRating} />

                </div>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 flex-row">
                        <div className="flex gap-y-3 flex-col py-5">
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

                            <div onClick={() => setShowUpdateProfile(true)} className="h-12 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary px-12 py-1 rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                                Edytuj
                            </div>
                        </div>
                        <Calendar />

                    </div>
                </div>
            </div>
            {showUpdateProfile && <UpdateProfile setShowUpdateProfile={setShowUpdateProfile} />}
        </>
        )
    }
}

export default Home;
