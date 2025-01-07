import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";


const HighestRatedGames = () => {

    const [highestRatedGames, setHighestRatedGames] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://chill-gamer-server-phi.vercel.app/games')
        .then(res => res.json())
        .then(data => {
            const sortedGames = data?.sort((a,b)=> b.avgRating - a.avgRating);
            const eightTopGames = sortedGames.slice(0,8);
            setHighestRatedGames(eightTopGames);
            setDataLoading(false)
        })
    }, [])

    return (
        <div className="mt-8 sm:mt-11 md:mt-14">
            <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col items-center gap-2 sm:gap-3 md:gap-4 mb-6 text-center">
                <h2 className="text-lg min-[300px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"><span className="text-red-700">Highest Rated</span> Games</h2>
                <p className="text-xs min-[400px]:text-sm sm:text-base">
                    Check out the highest rated games by our reviewers!<br/>
                    Click button to Explore More.
                </p>
            </div>
            {
                dataLoading ? <Loading></Loading> :
                <div className="w-11/12 md:w-10/12 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        highestRatedGames?.map(game =>
                            <div key={game.title} className="rounded-xl pb-3 border-2 border-red-700 relative flex flex-col items-center gap-2">
                                <div className="rounded-lg">
                                    <img src={game.coverImg} alt="Game_IMG" className="w-full rounded-t-xl"/>
                                </div>
                                <p className="text-red-700 text-lg sm:text-xl font-bold">{game.title}</p>
                                <div
                                    className="radial-progress text-orange-500 font-semibold absolute left-0"
                                    style={{ "--value": `${(game.avgRating*10).toFixed(1)}`, "--size": "3.5rem", "--thickness": "0.4rem" }}
                                    role="progressbar">
                                    {`${game.avgRating.toFixed(1)}`}
                                </div>
                                <button
                                    onClick={()=>navigate(`/games/${game._id}`)}
                                    className="w-11/12 sm:w-1/2 py-1 rounded-xl bg-orange-500 text-white font-semibold outline-none hover:scale-105">
                                        Explore More
                                </button>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default HighestRatedGames;