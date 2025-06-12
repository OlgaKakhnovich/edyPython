import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import Loading from "../components/LoadingBall";
import ChooseImg from "../components/ChooseImg";
import { Link } from 'react-router-dom';
import { PasswordValidation } from "../components/level/PasswordValidation";

const SignUp = () => {

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    });

    const [isFocused, setIsFocused] = useState(false);
    const { loading, signUp } = useSignUp();
    const [showChooseImg, setShowChooseImg] = useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (inputs.email && inputs.password && inputs.confirmPassword && inputs.username) {
            setShowChooseImg(true);
        }
    }

    useEffect(() => {
        if (inputs.profilePic) {
            setShowChooseImg(false);
            signUp(inputs);
        }

    }, [inputs.profilePic]);

    const bgDiv = document.documentElement.className == 'themes-dracula' ? 'bg-base100' : 'bg-secondary';
    const textDiv = document.documentElement.className == 'themes-dracula' ? 'text-neutralContent' : 'text-secondaryContent';
    const Div = document.documentElement.className == 'themes-dracula' ? 'bg-neutralContent' : 'bg-secondaryContent';
    const inputBg = document.documentElement.className == 'themes-dracula' ? 'bg-gray' : 'bg-base100';
    const text = document.documentElement.className == 'themes-dracula' ? 'text-base100' : 'text-neutralContent';
    const textInput = document.documentElement.className == 'themes-dracula' ? 'text-base300' : 'text-neutralContent';


    if (showChooseImg) {
        return (<ChooseImg setInputs={setInputs} inputs={inputs} isX={false} />)
    } else {
        return (
            <>
                <div className={`flex w-full flex-col justify-center px-2 py-12 lg:px-8 ${bgDiv} h-screen`}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
                        <h2 className={`font-bold text-center text-3xl ${textDiv} `}>EdyPython</h2>
                    </div>

                    <div className={`px-5 my-3 pt-2 pb-5 sm:mx-auto sm:w-full sm:max-w-sm ${Div} rounded-lg`}>
                        <h3 className="mt-3 pb-4 text-center text-2xl/9 font-bold tracking-tight text-secondary">Utwórz konto</h3>
                        <form className="space-y-4" onSubmit={handleSubmitForm}>

                            <div>
                                <label className={`block text-sm/6 font-medium ${text}`}>Username: </label>
                                <div className="mt-2">
                                    <input type="text" value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} className={`block w-full border-2 border-base200 rounded-md ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6`} />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm/6 font-medium ${text}`}>Email address: </label>
                                <div className="mt-2">
                                    <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} className={`block border-2 border-base200 w-full rounded-md ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6`} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className={`block text-sm/6 font-medium ${text}`}>Hasło: </label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} className={`block w-full border-2 border-base200 rounded-md ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6`} />
                                </div>
                            </div>

                            <div >
                                <div className="flex items-center justify-between ">
                                    <label className={`block text-sm/6 font-medium ${text}`}>Powtórz hasło:</label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} className={`block w-full rounded-md border-2 border-base200 ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2  ${inputs.password === inputs.confirmPassword ? 'focus:outline-secondary' : 'focus:outline-error'}  sm:text-sm/6`} />
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondaryContent shadow-xs hover:bg-secondaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    {loading ? <Loading /> : "Utwórz"}</button>
                            </div>
                        </form>

                        <p className={`block  text-center pt-2 text-sm/4 font-medium ${text}`}>
                            Już masz konto?
                            <Link to="/login" className="font-semibold text-secondary hover:text-secondaryHover hover:underline px-2">Wejdź</Link>
                        </p>
                    </div>
                </div>

                {<PasswordValidation password={inputs.password} />}

            </>)
    }
}

export default SignUp;