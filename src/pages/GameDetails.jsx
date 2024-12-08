import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Rating from "../utilities/Rating";
import { IoAddOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../components/Loading";


const GameDetails = () => {

    const {user, loading} = useContext(AuthContext);
    const game = useLoaderData();
    const {_id, title, coverImg, reviews, avgRating} = game;
    const [dataLoading, setDataLoading] = useState(true);
    const [description, setDescription] = useState('half');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (game && loading === false) {
            fetch('https://chill-gamer-server-phi.vercel.app/watchList')
            .then(res => res.json())
            .then(data => {
                const likedThisGame = data?.filter(item => item.title === game.title);
                const userIncluded = likedThisGame.find(obj => obj.userEmail === user.email);
                if (userIncluded) {
                    document.querySelectorAll(`.add${_id}`).forEach(element=>element.setAttribute('disabled',true));
                    setErrorMessage("Added to your watchList");
                }
                else {
                    document.querySelectorAll(`.add${_id}`).forEach(element=>element.removeAttribute('disabled'))
                }
            })
        }
        setDataLoading(false);
    }, [game,loading])

    const handleAddToWatchList = (gameId) => {
        const wishedGame = {
            title,
            coverImg,
            publishedYear: reviews[0].publishedYear,
            reviews,
            avgRating,
            userName: user.displayName,
            userEmail: user.email
        }
        fetch('https://chill-gamer-server-phi.vercel.app/watchList', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(wishedGame)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                document.querySelectorAll(`.add${gameId}`).forEach(element => element.setAttribute('disabled',true));
                toast.success(`${title} is added to your WatchList`,{
                    position: "top-center",
                    autoClose: 1500
                })
                setErrorMessage("Added to your watchList");
            }
        })
    }
    
    return (
        <>
        {
            dataLoading? <Loading></Loading>:
            <div className="w-11/12 md:w-10/12 mx-auto my-14 flex flex-col gap-6">
                <div className="rounded-xl">
                    <img src={coverImg} alt="" className="w-full rounded-xl" />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-700">{title}</h3>
                    <div className="flex flex-col-reverse md:flex-row justify-end items-end gap-1">
                        <p className="text-sm text-gray-400">{errorMessage}</p>
                        <button onClick={() => handleAddToWatchList(_id)}
                            data-tooltip-id="addToWatchList" data-tooltip-content="Add to WatchList"
                            className={`add${_id} btn btn-square max-sm:btn-sm sm:text-xl lg:text-2xl bg-green-500 outline-none shadow-md hover:scale-105 hover:bg-green-500`}>
                        <IoAddOutline />
                        </button>
                        <Tooltip id="addToWatchList" />
                    </div>
                </div>
                <p><span className="font-semibold">Published Year:</span> {reviews[0]?.publishedYear}</p>
                <div className="font-semibold flex items-center gap-2 sm:gap-4">
                    <span>Average Rating:</span>
                    <Rating rating={avgRating}></Rating>
                    <span className="font-medium text-orange-400">({avgRating.toFixed(1)})</span>
                </div>
                <p className="font semibold text-green-500">Reviews:</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        reviews.map((review, idx) =>
                            <div key={idx} className="border rounded-xl shadow-xl p-8 flex flex-col gap-4">
                                <h5 className="font-semibold text-lg text-red-700">{review.userName}</h5>
                                <div className="flex items-center gap-4">
                                    <Rating rating={review.rating}></Rating>
                                    <span className="text-orange-400">({review.rating})</span>
                                </div>
                                <p className="max-h-48 overflow-scroll">{description === 'half' ?
                                    <span>{review.description.slice(0, 250)}...
                                        <span onClick={() => setDescription('full')} className="font-bold hover:underline hover:cursor-pointer">see full review</span>
                                    </span> :
                                    <span>{review.description}</span>
                                }
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        }
        </>
    );
};

export default GameDetails;