import { useState, React } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useUpdate = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authUser } = useAuthContext();

    const update = async (inputs) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/auth/${authUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setAuthUser(data.data);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, update };
}

export default useUpdate;