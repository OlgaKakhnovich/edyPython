import { useState, React } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async (inputs) => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");
            setAuthUser(data);
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signUp };
}

export default useSignUp;