import { useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";
import { Tooltip } from "react-tooltip";
import Rating from "../utilities/Rating";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";


const ReviewDetails = () => {

    const { user, loading } = useContext(AuthContext);
    const review = useLoaderData();
    const {_id, title, coverImg, description, genre, publishedYear, rating} = review;
    const [game, setGame] = useState({});
    const [gameId, setGameId] = useState('');
    const [dataLoading, setDataLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (review && loading === false) {
            fetch('https://chill-gamer-server-phi.vercel.app/games')
            .then(res => res.json())
            .then(games => {
                const thisGame = games.find(game => game.title === title);
                setGame(thisGame);
                const id = thisGame._id;
                setGameId(id);
                fetch('https://chill-gamer-server-phi.vercel.app/watchList')
                .then(res => res.json())
                .then(data => {
                    const likedThisGame = data?.filter(item => item.title === title);
                    const userIncluded = likedThisGame.find(obj => obj.userEmail === user.email);
                    if (userIncluded) {
                        document.querySelectorAll(`.add${gameId}`).forEach(element => element.setAttribute('disabled', true));
                        setErrorMessage("Added to your watchList");
                        setDataLoading(false);
                    }
                    else {
                        document.querySelectorAll(`.add${gameId}`).forEach(element => element.removeAttribute('disabled'));
                        setDataLoading(false);
                    }
                })
            })
        }
    }, [review, loading])

    const handleAddToWatchList = (gameId) => {
        const wishedGame = {
            title,
            coverImg,
            publishedYear,
            reviews: game.reviews,
            avgRating: game.avgRating,
            userName: user.displayName,
            userEmail: user.email
        }
        fetch('https://chill-gamer-server-phi.vercel.app/watchList', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(wishedGame)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                document.querySelectorAll(`.add${gameId}`).forEach(element => element.setAttribute('disabled', true));
                toast.success(`${title} is added to your WatchList`, {
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
            dataLoading ? <Loading></Loading> :
            <div className="w-11/12 md:w-10/12 mx-auto my-14 flex flex-col gap-6">
                <div className="rounded-xl">
                    <img src={coverImg} alt="" className="w-full rounded-xl" />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-700">{title}</h3>
                    <div className="flex flex-col-reverse md:flex-row justify-end items-end gap-1">
                        <p className="text-sm text-gray-400">{errorMessage}</p>
                        <button onClick={() => handleAddToWatchList(gameId)}
                            data-tooltip-id="addToWatchList" data-tooltip-content="Add to WatchList"
                            className={`add${gameId} btn btn-square max-sm:btn-sm sm:text-xl lg:text-2xl bg-green-500 outline-none shadow-md hover:scale-105 hover:bg-green-500`}>
                        <IoAddOutline />
                        </button>
                        <Tooltip id="addToWatchList" />
                    </div>
                </div>
                <p><span className="font-semibold">Genre:</span> {genre}</p>
                <p><span className="font-semibold">Published Year:</span> {publishedYear}</p>
                <div className="font-semibold flex items-center gap-2 sm:gap-4">
                    <span>Rating:</span>
                    <Rating rating={rating}></Rating>
                    <span className="font-medium text-orange-400">({rating.toFixed(1)})</span>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">Reviewed by:</p>
                    <p>{review.userName}</p>
                </div>
                <p>{description}</p>
            </div>
        }    
        </>
    );
};

export default ReviewDetails;