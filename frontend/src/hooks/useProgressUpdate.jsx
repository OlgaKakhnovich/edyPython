import { useState, React } from "react";
import toast from "react-hot-toast";

const useProgressUpdate = () => {
    const [loading, setLoading] = useState(false);

    const update = async (userData) => {
        try {
            setLoading(true);

            const res = await fetch(`/api/levels/addProgress`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) throw new Error(data.error || "Something went wrong");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, update };
}

export default useProgressUpdate;

