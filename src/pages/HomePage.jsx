import HighestRatedGames from "../components/HighestRatedGames";
import Slider from "../components/Slider";
import ToggleTheme from "../components/ToggleTheme";


const HomePage = () => {
    return (
        <div>
            <ToggleTheme></ToggleTheme>
            <Slider></Slider>
            <HighestRatedGames></HighestRatedGames>
        </div>
    );
};

export default HomePage;