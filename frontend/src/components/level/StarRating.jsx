import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ score }) => {
    const getFilledStars = () => {
        if (score === 1) return 1;
        if (score === 2) return 2;
        if (score === 3) return 3;
        if (score === 4) return 4;
        return 5;
    };


    const filledStars = getFilledStars();
    const stars = Array.from({ length: 5 }, (_, index) => index < filledStars);

    return (<>
        <div className="flex items-center">
            {stars.map((filled, idx) => (
                <Star
                    key={idx}
                    className={`shrink-0 w-5 h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-neutral'}`}
                />
            ))}
        </div>
    </>)
}

export default StarRating;