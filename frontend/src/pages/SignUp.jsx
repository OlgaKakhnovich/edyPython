import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import Loading from "../components/LoadingBall";
import ChooseImg from "../components/ChooseImg";
import ChooseDifficulty from "../components/ChooseDifficulty";

const SignUp = () => {

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
        difficulty: "",
    });

    const { loading, signUp } = useSignUp();
    const [selectedImg, setSelectedImg] = useState();
    const [showChooseImg, setShowChooseImg] = useState(false);
    const [showChooseDifficulty, setShowChooseDifficulty] = useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setShowChooseImg(true);
    }

    useEffect(() => {
        if (inputs.profilePic) {
            setShowChooseImg(false);
            setShowChooseDifficulty(true);
        }

        if (inputs.difficulty && inputs.profilePic) {
            setShowChooseDifficulty(false);
            console.log(inputs);
            signUp(inputs);
        }

    }, [inputs.profilePic, inputs.difficulty]);



    if (showChooseImg) {
        return (<ChooseImg setInputs={setInputs} inputs={inputs} />)
    } else if (showChooseDifficulty) {
        return (<ChooseDifficulty setInputs={setInputs} inputs={inputs} />)
    } else {
        return (
            <>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="">EdyPython</h2>
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-baseContent">Sign up to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmitForm}>

                            <div>
                                <label className="block text-sm/6 font-medium text-baseContent">Username</label>
                                <div className="mt-2">
                                    <input type="text" value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm/6 font-medium text-baseContent">Email address</label>
                                <div className="mt-2">
                                    <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300  focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-baseContent">Hasło</label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300  focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-baseContent">Powtórz hasło</label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondaryContent shadow-xs hover:bg-secondaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    {loading ? <Loading /> : "Sign Up"}</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-baseContent">
                            Już masz konto?
                            <a href="#" className="font-semibold text-secondary hover:text-secondaryHover"> Wejdź</a>
                        </p>
                    </div>
                </div>
            </>)
    }
}

export default SignUp;