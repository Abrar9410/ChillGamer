import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Rating from "../utilities/Rating";


const GameDetails = () => {

    const game = useLoaderData();
    const {_id, title, coverImg, reviews, avgRating} = game;
    const [dataLoading, setDataLoading] = useState(true);
    const [description, setDescription] = useState('half');

    useEffect(() => {
        if (game) {
            setDataLoading(false);
        }
    }, [game])
    
    return (
        <div className="w-11/12 md:w-10/12 mx-auto my-14 flex flex-col gap-6">
            <div className="rounded-xl">
                <img src={coverImg} alt="" className="w-full rounded-xl" />
            </div>
            <h3 className="text-lg font-bold text-red-700">{title}</h3>
            <p><span className="font-semibold">Published Year:</span> {reviews[0]?.publishedYear}</p>
            <p className="font-semibold flex items-center gap-2 sm:gap-4">
                <span>Average Rating:</span>
                <Rating rating={avgRating}></Rating>
                <span className="font-medium text-orange-400">({avgRating.toFixed(1)})</span>
            </p>
            <p className="font semibold text-green-500">Reviews</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {
                    reviews.map((review, idx) =>
                        <div key={idx} className="border rounded-xl shadow-xl p-8 flex flex-col gap-4">
                            <h5 className="font-semibold text-lg text-red-700">{review.userName}</h5>
                            <p className="flex items-center gap-4">
                                <Rating rating={review.rating}></Rating>
                                <span className="text-orange-400">({review.rating})</span>
                            </p>
                            <p className="max-h-48 overflow-scroll">{description === 'half' ? 
                                <span>{review.description.slice(0, 250)}...
                                    <span onClick={()=>setDescription('full')} className="font-bold hover:underline hover:cursor-pointer">see full review</span>
                                </span>:
                                <span>{review.description}</span>
                            }    
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default GameDetails;