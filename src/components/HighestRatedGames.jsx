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
            const sixTopGames = sortedGames.slice(0,6);
            setHighestRatedGames(sixTopGames);
            setDataLoading(false)
        })
    }, [])

    return (
        <div className="mt-14">
            <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col items-center gap-4 mb-6 text-center">
                <h2 className="text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold"><span className="text-red-700">Highest Rated</span> Games</h2>
                <p>Check out the highest rated games by our reviewers!<br/>Click button to Explore More.</p>
            </div>
            {
                dataLoading ? <Loading></Loading> :
                <div className="w-11/12 md:w-10/12 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        highestRatedGames?.map(game =>
                            <div key={game.title} className="rounded-lg pb-3 border-2 border-red-700 relative flex flex-col items-center gap-2">
                                <div className="rounded-lg">
                                    <img src={game.coverImg} alt="Game_IMG" className="w-full rounded-t-lg"/>
                                </div>
                                <p className="text-red-700 text-lg sm:text-xl font-bold">{game.title}</p>
                                <div
                                    className="radial-progress text-orange-500 font-semibold absolute left-0"
                                    style={{ "--value": `${(game.avgRating*10).toFixed(1)}`, "--size": "4rem", "--thickness": "0.4rem" }}
                                    role="progressbar">
                                    {`${game.avgRating.toFixed(1)}`}
                                </div>
                                <button
                                    onClick={()=>navigate(`/games/${game._id}`)}
                                    className="w-full sm:w-1/2 py-1 rounded-xl bg-orange-500 text-white font-semibold outline-none hover:scale-105">Explore More</button>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default HighestRatedGames;