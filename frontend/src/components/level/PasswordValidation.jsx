import React from "react";
import { X, Check } from "lucide-react";

export const PasswordValidation = ({ password }) => {

    const Div = document.documentElement.className == 'themes-dracula' ? 'bg-neutralContent' : 'text-secondaryContent';
    const text = document.documentElement.className == 'themes-dracula' ? 'text-base100' : 'text-neutralContent';
    const textStr = document.documentElement.className == 'themes-dracula' ? 'text-secondaryHover' : 'bg-base200';

    const checkPassword = [
        {
            label: "Minimalna liczba znaków to 6.",
            valid: password.length >= 6,
        },
        {
            label: "Powinno zawierać małe litery.",
            valid: /[a-z]/.test(password),
        },
        {
            label: "Powinno zawierać duże litery.",
            valid: /[A-Z]/.test(password),
        },
        {
            label: "Powinno zawierać cyfry.",
            valid: /[0-9]/.test(password),
        },
        {
            label: "Powinno zawierać znaki specjalne .",
            valid: /[._\/\\-]/.test(password),
        },
    ]

    const strength = [
        'Pusto', 'Słabe', 'Średnie', "Skomplikowane",
        "Bardzo skomplikowane",
        "Super skomplikowane",
    ]

    const passed = checkPassword.filter(check => check.valid).length;

    return (
        <>
            <div className={`${Div} ${text} flex items-center gap-y-3 justify-center fixed right-60 flex-col p-5 rounded-lg `}>
                <div className=" flex flex-row gap-x-2">
                    <span className={`block text-base font-medium ${text}`}>Złożoność: </span>
                    <span className={`block text-base font-medium ${textStr}`}>{strength[passed]}</span>
                </div>

                <h3 className={`block text-base font-medium ${text}`}>Twoje hasło musi zawierać: </h3>

                <ul className=" flex gap-y-2 flex-col">
                    {checkPassword.map((rule, index) => (
                        <li key={index} className="flex items-center justify-start flex-row gap-x-2">
                            {rule.valid ? <Check className="text-success" /> : <X />}
                            <span className={`block text-sm font-medium ${text}`}>
                                {rule.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}