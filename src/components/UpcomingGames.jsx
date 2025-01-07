import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import { Typewriter } from "react-simple-typewriter";

const UpcomingGames = () => {
    return (
        <>
            <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col items-center gap-4 mt-8 sm:mt-11 md:mt-14 mb-6 text-center">
                <div className="text-lg min-[300px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-400 font-extrabold">
                    <Typewriter words={["Upcoming Games"]} typeSpeed={75} cursor={true} delaySpeed={1000} deleteSpeed={25} loop={0} />
                </div>
                <p className="text-xs min-[400px]:text-sm sm:text-base">
                    Be excited as these mind blowing games are waiting to be released in the near future!
                    Check these out.
                </p>
            </div>
            <div className="w-11/12 md:w-10/12 mx-auto sm:h-[70vh] mb-14">
                <div className="carousel w-full h-[70vh]">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src={img1}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src={img2}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src={img3}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpcomingGames;