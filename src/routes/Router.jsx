import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AllReviews from "../pages/AllReviews";
import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import WatchList from "../pages/WatchList";
import PrivateRoute from "./PrivateRoute";
import ReviewDetails from "../pages/ReviewDetails";
import GameDetails from "../pages/GameDetails";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/allReviews",
                element: <AllReviews></AllReviews>,
                loader: () => fetch('https://chill-gamer-server-phi.vercel.app/reviews')
            },
            {
                path: "/allReviews/:id",
                element: <ReviewDetails></ReviewDetails>,
                loader: ({params}) => fetch(`https://chill-gamer-server-phi.vercel.app/reviews/${params.id}`)
            },
            {
                path: "/games/:id",
                element: <GameDetails></GameDetails>,
                loader: ({params}) => fetch(`https://chill-gamer-server-phi.vercel.app/games/${params.id}`)
            },
            {
                path: "/addReview",
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: "/myReviews",
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            {
                path: "/watchList",
                element: <PrivateRoute><WatchList></WatchList></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
])

export default Router;