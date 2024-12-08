import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/chill-gamer-logo.png";
import emptyUser from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut(); 
            }
        });
    }

    return (
        <div className="bg-gradient-to-r from-red-800 via-orange-700 to-rose-400">
            <div className="w-11/12 lg:w-10/12 mx-auto py-1 md:py-2 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-10">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn-ghost md:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/allReviews">All Reviews</NavLink></li>
                                <li><NavLink to="/addReview">Add Review</NavLink></li>
                                {user && <li><NavLink to="/myReviews">My Reviews</NavLink></li>}
                                {user && <li><NavLink to="/watchList">Watchlist</NavLink></li>}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-1">
                            <img className="w-4 sm:w-6 md:w-8" src={logo} alt="logo" />
                            <p className="sm:text-lg md:text-xl font-semibold text-yellow-400">Chill Gamer</p>
                        </Link>
                        {
                            location.pathname === "/login" || location.pathname === "/register" ? <div></div> :
                                <div className="hidden md:flex justify-center items-center gap-4 bg-black text-white max-lg:text-sm px-2 py-1 rounded-md">
                                    <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : "hover:scale-105"}>Home</NavLink>
                                    <NavLink to="/allReviews" className={({ isActive }) => isActive ? "text-red-500" : "hover:scale-105"}>All Reviews</NavLink>
                                    <NavLink to="/addReview" className={({ isActive }) => isActive ? "text-red-500" : "hover:scale-105"}>Add Review</NavLink>
                                    {user && <NavLink to="/myReviews" className={({ isActive }) => isActive ? "text-red-500" : "hover:scale-105"}>My Reviews</NavLink>}
                                    {user && <NavLink to="/watchList" className={({ isActive }) => isActive ? "text-red-500" : "hover:scale-105"}>Watchlist</NavLink>}
                                </div>
                        }
                    </div>
                    {
                        location.pathname === "/login" || location.pathname === "/register" ?
                            <div className="w-max bg-white rounded-full"><img src={emptyUser} alt="empty_user" /></div> :
                            <div></div>
                    }
                    {
                        location.pathname === "/login" || location.pathname === "/register" ||
                        <div className="flex max-[270px]:flex-col justify-end items-center max-[290px]:gap-1 gap-2">
                            {user &&
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border">
                                    <img className="w-full h-full rounded-full" src={user.photoURL} alt="user_IMG" data-tooltip-id="name-tooltip" data-tooltip-content={user.displayName} />
                                    <Tooltip id="name-tooltip" />
                                </div>}
                            {
                                user ?
                                    <button onClick={handleLogOut} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-black text-red-500 hover:scale-105 shadow-md">Log Out</button>
                                    : <button onClick={() => navigate("/login")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-black text-red-500 hover:scale-105 shadow-md">Log In</button>
                            }
                            {!user && <button onClick={() => navigate("/register")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-black text-red-500 hover:scale-105 shadow-md">Register</button>}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;