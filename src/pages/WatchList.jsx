import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";


const WatchList = () => {

    const {user} = useContext(AuthContext);
    const [myWatchList, setMyWatchList] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('https://chill-gamer-server-phi.vercel.app/watchList')
            .then(res => res.json())
            .then(data => {
                const userWatchList = data?.filter(games => games.userEmail === user.email);
                setMyWatchList(userWatchList);
            })
    }, [reload])

    const handleDeleteGame = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chill-gamer-server-phi.vercel.app/watchList/${id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success"
                        });
                        setReload(!reload);
                    }
                })
            }
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2">
                <h2 className="max-w-[90vw] text-black text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold">My WatchList</h2>
                <p className="max-w-[90vw] text-black/85 font-semibold">
                    Games you added to view later are all here.
                </p>
            </div>
            <div className="overflow-x-auto my-14 w-11/12 mx-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Game Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myWatchList.length && myWatchList.map((game, idx) =>
                                <tr key={game._id} className="hover">
                                    <th>{idx + 1}</th>
                                    <td>{game.title}</td>
                                    <td>{game.reviews[0].genre}</td>
                                    <td>{game.avgRating}</td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <button className="outline-none rounded-full px-2 bg-red-500 text-black text-sm hover:scale-105"
                                                onClick={() => handleDeleteGame(game._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {}
        </div>
    );
};

export default WatchList;