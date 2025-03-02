import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const AddReview = () => {

    const {user} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddReview = e => {
        e.preventDefault();
        setErrorMessage('');
        const form = e.target;
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
        const review = {
            title,
            coverImg,
            description,
            genre,
            publishedYear,
            rating,
            userName,
            userEmail
        };
        fetch('https://chill-gamer-server-phi.vercel.app/reviews')
        .then(res => res.json())
        .then(data => {
            const query = data?.filter(review => review.userEmail === userEmail).find(userReview => userReview.title === title);
            if (query) {
                setErrorMessage("You already have given a review on this Game! You may want to update your review from 'My Reviews' page");
            }
            else {
                fetch('https://chill-gamer-server-phi.vercel.app/reviews', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(review)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Review added successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetch('https://chill-gamer-server-phi.vercel.app/games')
                        .then(res => res.json())
                        .then(games => {
                            const foundGame = games?.find(game => game.title === review.title);

                            if (foundGame) {
                                const reviewsArray = foundGame.reviews;
                                const updatedReviewsArray = [...reviewsArray, review];
                                const ratingsArray = updatedReviewsArray.map(upRev=>upRev.rating);
                                const totalRating = ratingsArray.reduce((prev, curr) => prev + curr, 0);
                                const avgRating = totalRating / updatedReviewsArray.length;
                                const game = {
                                    title,
                                    coverImg,
                                    reviews: updatedReviewsArray,
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
                                        form.reset();
                                    }
                                })
                            }
                            else {
                                const game = {
                                    title,
                                    coverImg,
                                    reviews: [review],
                                    avgRating: review.rating
                                }
                                fetch('https://chill-gamer-server-phi.vercel.app/games', {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(game)
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        toast.success('Congrates! You are the First to review this Game.', {
                                            autoClose: 2000
                                        });
                                        form.reset();
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2">
                <h2 className="max-w-[90vw] text-black text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold">Add New Review</h2>
                <p className="max-w-[90vw] text-black/85 font-semibold">
                    Here you can add reviews of games of your choice. Your opinion does matter. Feel free to
                    share your thoughts.
                </p>
            </div>
            <div className="w-10/12 mx-auto my-8 border rounded-xl sm:p-8">
                <form onSubmit={handleAddReview} className="sm:space-y-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Game Title</span>
                            </label>
                            <input type="text" placeholder="title" name="title" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">Game Thumbnail</span>
                            </label>
                            <input type="text" placeholder="cover-image url" name="coverImg" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-semibold">Review Description</span>
                        </label>
                        <textarea placeholder="type your detail review" name="description" className="textarea textarea-bordered textarea-md w-full"></textarea>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Genre</span>
                            </label>
                            <select name="genre" className="w-full h-12 rounded-lg px-4">
                                <option>select a genre</option>
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
                                <option>year</option>
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
                                <option>select rating</option>
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
                    <input type="submit" value="Submit Review" className="btn w-full h-12 rounded-lg border bg-green-500"/>
                </form>
            </div>
        </div>
    );
};

export default AddReview;