import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const MyReviews = () => {

    const {user} = useContext(AuthContext);
    const [myReviews, setMyReviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('https://chill-gamer-server-phi.vercel.app/reviews')
        .then(res => res.json())
        .then(data => {
            const userReviews = data?.filter(review => review.userEmail === user.email);
            setMyReviews(userReviews);
        })
    },[reload])

    const handleUpdateReview = (id) => {
        setErrorMessage('');
        const form = document.getElementById(`${id}a`);
        const title = form.title.value;
        const coverImg = form.coverImg.value;
        const description = form.description.value;
        const genre = form.genre.value;
        const publishedYear = form.year.value;
        const rating = parseFloat(form.rating.value);
        const userName = form.userName.value;
        const userEmail = form.userEmail.value;
        if (genre === 'select a genre') {
            setErrorMessage('Please select a Genre for this game!');
            return;
        }
        if (publishedYear === 'year') {
            setErrorMessage('Please select the published year of this game!');
            return;
        }
        if (isNaN(rating)) {
            setErrorMessage('Please provide a rating for this game!');
            return;
        }
        const updatedReview = {
            title,
            coverImg,
            description,
            genre,
            publishedYear,
            rating,
            userName,
            userEmail
        };
        fetch(`https://chill-gamer-server-phi.vercel.app/reviews/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedReview)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount>0) {
                document.getElementById(id).close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your review has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                setReload(!reload);
                fetch('https://chill-gamer-server-phi.vercel.app/games')
                .then(res => res.json())
                .then(games => {
                    const foundGame = games?.find(game => game.title === updatedReview.title);
                    const indexOfMyReview = foundGame.reviews.indexOf(foundGame.reviews.find(review => review.userEmail === user.email));
                    foundGame.reviews[indexOfMyReview] = updatedReview;
                    const ratingsArray = foundGame.reviews.map(rev => rev.rating);
                    const totalRating = ratingsArray.reduce((prev, curr) => prev + curr, 0);
                    const avgRating = totalRating / foundGame.reviews.length;
                    const game = {
                        title,
                        coverImg,
                        reviews: foundGame.reviews,
                        avgRating
                    };
                    fetch(`https://chill-gamer-server-phi.vercel.app/games/${foundGame._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(game)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            toast.info('database updated', {
                                autoClose: 2000
                            });
                        }
                    })        
                })
            }
        })
    }

    const handleDeleteReview = (id, gameTitle) => {
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
                fetch(`https://chill-gamer-server-phi.vercel.app/reviews/${id}`, {
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
                        fetch('https://chill-gamer-server-phi.vercel.app/games')
                        .then(res => res.json())
                        .then(games => {
                            const foundGame = games?.find(game => game.title === gameTitle);
                            const remainingReviews = foundGame.reviews.filter(review => review.userEmail !== user.email);
                            const ratingsArray = remainingReviews.map(rev => rev.rating);
                            const totalRating = ratingsArray.reduce((prev, curr) => prev + curr, 0);
                            const avgRating = totalRating / remainingReviews.length;
                            const game = {
                                title: foundGame.title,
                                coverImg: foundGame.coverImg,
                                reviews: remainingReviews
                            };
                            fetch(`https://chill-gamer-server-phi.vercel.app/games/${foundGame._id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(game)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount > 0) {
                                    toast.info('database updated', {
                                        autoClose: 2000
                                    });
                                }
                            })
                        })
                    }
                })
            }
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2">
                <h2 className="max-w-[90vw] text-black text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold">My Reviews</h2>
                <p className="max-w-[90vw] text-black/85 font-semibold">
                    Here are all the reviews you have added until now.
                    See if you want to update or delete any review.
                </p>
            </div>
            {
                myReviews.length? myReviews.map(review => 
                    <div key={review._id} className="w-10/12 mx-auto">
                        
                        <button onClick={()=>document.getElementById(`${review._id}`).showModal()}>Update</button>
                        <button onClick={() => handleDeleteReview(review._id, review.title)}>Delete</button>
                        <dialog id={review._id} className="w-11/12 mx-auto max-h-[95vh] overflow-scroll">
                            <div className="w-10/12 mx-auto my-8 border rounded-xl sm:p-8">
                                <form id={`${review._id}a`} className="sm:space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">Game Title</span>
                                            </label>
                                            <input type="text" placeholder="title" name="title" value={review.title} readOnly className="input input-bordered w-full" required />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">Game Thumbnail</span>
                                            </label>
                                            <input type="text" placeholder="cover-image url" name="coverImg" defaultValue={review.coverImg} className="input input-bordered w-full" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="font-semibold">Review Description</span>
                                        </label>
                                        <textarea placeholder="type your detail review" name="description" defaultValue={review.description} className="textarea textarea-bordered textarea-md w-full"></textarea>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">Genre</span>
                                            </label>
                                            <select name="genre" className="w-full h-12 rounded-lg px-4">
                                                <option>{review.genre}</option>
                                                <option value="Action">Action</option>
                                                <option value="Action-Adventure">Action-Adventure</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Board Game">Board Game</option>
                                                <option value="Horror">Horror</option>
                                                <option value="Puzzle">Puzzle</option>
                                                <option value="Role-playing">Role-playing</option>
                                                <option value="RPG">RPG</option>
                                                <option value="Simulation">Simulation</option>
                                                <option value="Strategy">Strategy</option>
                                                <option value="Sports">Sports</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">Published Year</span>
                                            </label>
                                            <select name="year" className="w-full h-12 rounded-lg px-4">
                                                <option>{review.publishedYear}</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                                <option value="2014">2014</option>
                                                <option value="2013">2013</option>
                                                <option value="2012">2012</option>
                                                <option value="2011">2011</option>
                                                <option value="2010">2010</option>
                                                <option value="2009">2009</option>
                                                <option value="2008">2008</option>
                                                <option value="2007">2007</option>
                                                <option value="2006">2006</option>
                                                <option value="2005">2005</option>
                                                <option value="2004">2004</option>
                                                <option value="2003">2003</option>
                                                <option value="2002">2002</option>
                                                <option value="2001">2001</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">Rating</span>
                                            </label>
                                            <select name="rating" className="w-full h-12 rounded-lg px-4">
                                                <option>{review.rating.toFixed(1)}</option>
                                                <option value="0.0">0.0</option>
                                                <option value="0.5">0.5</option>
                                                <option value="1.0">1.0</option>
                                                <option value="1.5">1.5</option>
                                                <option value="2.0">2.0</option>
                                                <option value="2.5">2.5</option>
                                                <option value="3.0">3.0</option>
                                                <option value="3.5">3.5</option>
                                                <option value="4.0">4.0</option>
                                                <option value="4.5">4.5</option>
                                                <option value="5.0">5.0</option>
                                                <option value="5.5">5.5</option>
                                                <option value="6.0">6.0</option>
                                                <option value="6.5">6.5</option>
                                                <option value="7.0">7.0</option>
                                                <option value="7.5">7.5</option>
                                                <option value="8.0">8.0</option>
                                                <option value="8.5">8.5</option>
                                                <option value="9.0">9.0</option>
                                                <option value="9.5">9.5</option>
                                                <option value="10.0">10.0</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">User Name</span>
                                            </label>
                                            <input type="text" placeholder="username" name="userName" className="input input-bordered w-full" value={user.displayName} readOnly required />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="font-semibold">User Email</span>
                                            </label>
                                            <input type="email" placeholder="user email" name="userEmail" className="input input-bordered w-full" value={user.email} readOnly required />
                                        </div>
                                    </div>
                                    <p>{errorMessage}</p>
                                </form>
                                <button onClick={()=>handleUpdateReview(review._id)} className="btn w-full h-12 rounded-lg border">Update Review</button>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div> 
                ): <p>No review</p>
            }
        </div>
    );
};

export default MyReviews;