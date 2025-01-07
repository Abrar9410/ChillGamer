import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Rating from "../utilities/Rating";
import Loading from "../components/Loading";


const AllReviews = () => {

    const data = useLoaderData();
    const [allReviews, setAllReviews] = useState(data);
    const [dataLoading, setDataLoading] = useState(true);
    const [filterBtnText, setFilterBtnText] = useState('Filter (Genre)');
    const [sortBtnText, setSortBtnText] = useState('Sort by');
    const navigate = useNavigate();

    const handleFilter = e => {
        setDataLoading(true);
        const filterBy = e.target.innerText;
        setFilterBtnText(filterBy);
        document.querySelector('#filterBtn').removeAttribute('open');
        const filteredReviews = [...data].filter(review => review.genre === filterBy);
        setAllReviews(filteredReviews);
        setDataLoading(false);
    }

    const handleSort = e => {
        setDataLoading(true);
        const sortBy = e.target.innerText;
        setSortBtnText(`Sorted (${sortBy})`);
        document.getElementById('sortBtn').removeAttribute('open');
        if (sortBy==='Rating') {
            const sortedByRating = [...allReviews]?.sort((a, b) => b.rating - a.rating);
            setAllReviews(sortedByRating);
            setDataLoading(false);
            return;   
        }
        if (sortBy==='Year') {
            const sortedByYear = [...allReviews]?.sort((a, b) => b.publishedYear - a.publishedYear);
            setAllReviews(sortedByYear);
            setDataLoading(false);
            return;
        }
    }

    useEffect(() => {
        if (allReviews) {
            setDataLoading(false);
        }
        else {
            setAllReviews([]);
        }
    }, [])

    return (
        <div>
            <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2">
                <h2 className="max-w-[90vw] text-black text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold">All Reviews from<br />Our Users</h2>
                <p className="max-w-[90vw] text-black/85 font-semibold">Here is the collection of all the reviews from our expert critics. Check out the reviews and gain in-depth knowledge about a particular game.
                    <br/>Happy Gaming!!
                </p>
            </div>
            <div className="w-11/12 lg:w-10/12 mx-auto my-8 flex justify-between">
                <details className="dropdown" id="filterBtn">
                    <summary tabIndex={0} role="button" className="btn bg-red-600 outline-none hover:bg-red-600 hover:scale-105">{filterBtnText}</summary>
                    <ul onClick={handleFilter} tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-max p-2 shadow">
                        <li className="cursor-pointer hover:bg-red-600">Action</li>
                        <li className="cursor-pointer hover:bg-red-600">Action-Adventure</li>
                        <li className="cursor-pointer hover:bg-red-600">Adventure</li>
                        <li className="cursor-pointer hover:bg-red-600">Board Game</li>
                        <li className="cursor-pointer hover:bg-red-600">Horror</li>
                        <li className="cursor-pointer hover:bg-red-600">Puzzle</li>
                        <li className="cursor-pointer hover:bg-red-600">Role-playing</li>
                        <li className="cursor-pointer hover:bg-red-600">RPG</li>
                        <li className="cursor-pointer hover:bg-red-600">Simulation</li>
                        <li className="cursor-pointer hover:bg-red-600">Strategy</li>
                        <li className="cursor-pointer hover:bg-red-600">Sports</li>
                    </ul>
                </details>
                <details className="dropdown" id="sortBtn">
                    <summary tabIndex={0} role="button" className="btn bg-rose-400 outline-none hover:bg-rose-400 hover:scale-105">{sortBtnText}</summary>
                    <ul onClick={handleSort} tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li className="cursor-pointer hover:bg-rose-400">Rating</li>
                        <li className="cursor-pointer hover:bg-rose-400">Year</li>
                    </ul>
                </details>
            </div>
            {
                dataLoading? <Loading></Loading>:
                <div className="w-11/12 sm:w-10/12 mx-auto grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-10">
                    {
                        allReviews.length? allReviews.map(review =>
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
                                    <span>{review.description.slice(0, 200)}...
                                        <span onClick={() => navigate(`/allReviews/${review._id}`)} className="font-bold hover:underline hover:cursor-pointer">see full review</span>
                                    </span>
                                }
                                </p>
                            </div>
                        ):
                        <div className="md:col-span-2 xl:col-span-3 text-center text-3xl text-gray-400 font-semibold">No Reviews to Show</div>
                    }
                </div>    
            }
        </div>
    );
};

export default AllReviews;