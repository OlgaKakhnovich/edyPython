import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="">EdyPython</h2>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-baseContent">Sign up to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label className="block text-sm/6 font-medium text-baseContent">Email address</label>
                            <div className="mt-2">
                                <input placeholder="email@mail.com" type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-baseContent">Hasło</label>
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-baseContent">Powtórz hasło</label>
                            </div>
                            <div className="mt-2">
                                <input type="repassword" name="repassword" id="repassword" autoComplete="current-password" required className="block w-full rounded-md bg-neutral px-3 py-1.5 text-base text-neutralContent outline-1 -outline-offset-1 outline-base300 placeholder:text-base300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondaryContent shadow-xs hover:bg-secondaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
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

export default SignUp;