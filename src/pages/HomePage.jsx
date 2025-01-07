import HighestRatedGames from "../components/HighestRatedGames";
import Newsletter from "../components/Newsletter";
import RecentlyReleased from "../components/RecentlyReleased";
import Slider from "../components/Slider";
import ToggleTheme from "../components/ToggleTheme";
import UpcomingGames from "../components/UpcomingGames";


const HomePage = () => {
    return (
        <div>
            <ToggleTheme></ToggleTheme>
            <Slider></Slider>
            <HighestRatedGames></HighestRatedGames>
            <RecentlyReleased></RecentlyReleased>
            <UpcomingGames></UpcomingGames>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;