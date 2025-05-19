import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Code, Braces, Ampersands, X } from "lucide-react";
import ChooseImg from "./ChooseImg";
import useUpdate from "../hooks/useUpdate";

const UpdateProfile = ({ setShowUpdateProfile }) => {

    const { authUser } = useAuthContext();
    const [showChooseImg, setShowChooseImg] = useState(false);
    const { loading, update } = useUpdate();

    const [inputs, setInputs] = useState({
        id: authUser?.id,
        updatedAt: new Date().toISOString(),
        username: authUser?.username,
        profilePic: authUser?.profilePic,
    });



    const handleSubmitForm = (e) => {
        e.preventDefault();
        update(inputs);
        setShowUpdateProfile(false);
    }


    /*

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!authUser?.id) {
            toast.error("User is not authenticated");
            return;
        }

        try {
            const updatedData = {
                username: inputs.username,
                profilePic: inputs.profilePic,
                difficulty: Number(inputs.difficulty),
            };


            const updatedUser = await handleUpdateUser(authUser.id, updatedData);

            setAuthUser(updatedUser.data);

            setShowUpdateProfile(false);
        } catch (error) {
            console.log(error);
        }
    }
*/

    return (<>
        {showChooseImg && <ChooseImg setInputs={setInputs} inputs={inputs} isX={true} setShowChooseImg={setShowChooseImg} />}
        <div className=" flex rounded-xl min-w-96 flex-col gap-y-6 bg-base200 absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5">
            <X onClick={() => setShowUpdateProfile(false)} className="absolute text-baseContent right-5 cursor-pointer" />
            <h2 className="block text-center font-bold text-baseContent text-xl">Profil</h2>
            <form onSubmit={handleSubmitForm} className="flex flex-col gap-y-5">
                <div className="flex flex-row gap-x-6">
                    <div className="flex flex-col gap-y-2">
                        <img onClick={() => setShowChooseImg(true)} className="size-44 rounded-full cursor-pointer hover:scale-95 transition-transform -translate-x-full sm:translate-x-0" src={inputs.profilePic} />
                    </div>
                    <div className="flex gap-y-3 flex-col items-center justify-center">
                        <div className="text-baseContent block  ">
                            <h2 className="font-bold pb-3">Nickname:</h2>
                            <input type="text" value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="h-10 cursor-pointer flex items-center justify-center text-accentContent bg-secondary rounded-3xl font-medium hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                    Zapisz zmiany
                </button>
            </form>

        </div>
    </>
    )
}

export default UpdateProfile;