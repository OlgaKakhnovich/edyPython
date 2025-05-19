import React from "react";
import { useState } from "react";
import useLogIn from "../hooks/useLogIn";
import { Link } from 'react-router-dom';

const LogIn = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { loading, login } = useLogIn()

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        login(inputs.email, inputs.password);
    }

    const bgDiv = document.documentElement.className == 'themes-dracula' ? 'bg-base100' : 'bg-secondary';
    const textDiv = document.documentElement.className == 'themes-dracula' ? 'text-neutralContent' : 'text-secondaryContent';
    const Div = document.documentElement.className == 'themes-dracula' ? 'bg-neutralContent' : 'text-secondaryContent';
    const inputBg = document.documentElement.className == 'themes-dracula' ? 'bg-gray' : 'bg-base200';
    const text = document.documentElement.className == 'themes-dracula' ? 'text-base100' : 'text-neutralContent';
    const textInput = document.documentElement.className == 'themes-dracula' ? 'text-base300' : 'text-neutralContent';

    return (<>
        <div className={`flex w-full h-screen ${bgDiv} flex-col justify-center px-6 py-12 lg:px-8`}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
                <h2 className={`font-bold text-center text-3xl ${textDiv}`}>EdyPython</h2>
            </div>

            <div className={`px-5 my-3 pt-2 pb-5 sm:mx-auto sm:w-full sm:max-w-sm ${Div} rounded-lg`}>
                <h3 className="mt-3 pb-4 text-center text-2xl/9 font-bold tracking-tight text-secondary">Sign in to your account</h3>
                <form className="space-y-4" onSubmit={handleSubmitForm}>
                    <div>
                        <label className={`block text-sm/6 font-medium ${text}`}>Email address: </label>
                        <div className="mt-2">
                            <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} className={`block w-full rounded-md ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6`} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className={`block text-sm/6 font-medium ${text}`}>Hasło: </label>
                        </div>
                        <div className="mt-2">
                            <input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} className={`block w-full rounded-md ${inputBg} px-3 py-1.5 text-base ${textInput} outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6`} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondaryContent shadow-xs hover:bg-secondaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className={`block  text-center pt-2 text-sm/4 font-medium ${text}`}>
                    Nie masz konta?
                    <Link to="/signup" className={`font-semibold text-secondary hover:text-secondaryHover hover:underline px-2`}>Stwórz konto</Link>
                </p>
            </div >
        </div >
    </>)
}

export default LogIn;
