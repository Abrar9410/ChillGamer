import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Rating from "../utilities/Rating";
import Loading from "../components/Loading";


const AllReviews = () => {

    const data = useLoaderData();
    const [allReviews, setAllReviews] = useState(data);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (allReviews) {
            setDataLoading(false);
        }
        else {
            setAllReviews([]);
        }
    }, [allReviews])

    return (
        <div>
            <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2">
                <h2 className="max-w-[90vw] text-black text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold">All Reviews<br/>From Our Users</h2>
                <p className="max-w-[90vw] text-black/85 font-semibold">Here is the collection of all the reviews from our expert critics. Check out the reviews and gain in-depth knowledge about a particular game.
                    <br/>Happy Gaming!!
                </p>
            </div>
            <div className="w-11/12 mx-auto my-8 flex justify-between">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">Filter</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li>Action</li>
                        <li>Action-Adventure</li>
                        <li>Adventure</li>
                        <li>Board Game</li>
                        <li>Horror</li>
                        <li>Puzzle</li>
                        <li>Role-playing</li>
                        <li>RPG</li>
                        <li>Simulation</li>
                        <li>Strategy</li>
                        <li>Sports</li>
                    </ul>
                </div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">Sort by</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li>Rating</li>
                        <li>Year</li>
                    </ul>
                </div>
            </div>
            {
                dataLoading? <Loading></Loading>:
                <div className="w-11/12 sm:w-10/12 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {
                        allReviews && allReviews.map(review =>
                            <div key={review._id} className="border rounded-xl shadow-xl p-8 flex flex-col gap-4">
                                <div>
                                    <img src={review.coverImg} alt="" className="w-full rounded-lg" />
                                </div>
                                <h5 className="font-semibold text-lg text-red-700 text-center">{review.title}</h5>
                                <div className="flex justify-center items-center gap-4">
                                    <Rating rating={review.rating}></Rating>
                                    <span className="text-orange-400">({review.rating})</span>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <p className="font-semibold">Reviewed by:</p>
                                    <p>{review.userName}</p>
                                </div>
                                <hr />
                                <p className="max-h-48 overflow-scroll">{
                                    <span>{review.description.slice(0, 250)}...
                                        <span onClick={() => navigate(`/allReviews/${review._id}`)} className="font-bold hover:underline hover:cursor-pointer">see full review</span>
                                    </span>
                                }
                                </p>
                            </div>
                        )
                    }
                </div>    
            }
        </div>
    );
};

export default AllReviews;