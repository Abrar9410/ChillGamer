import recent1 from "../assets/fairy-tale-2.jpg";
import recent2 from "../assets/mighty-morphin-power-rangers.jpg";
import recent3 from "../assets/legacy-of-kain.jpg";

const RecentlyReleased = () => {
    return (
        <>
            <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col items-center gap-4 mt-14 mb-6 text-center">
                <h2 className="text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-5xl text-rose-400 font-extrabold">
                    Recently Released
                </h2>
                <p>
                    These are the latest Games released within last two weeks. Check out reviews, play and give
                    your own opinion!
                </p>
            </div>
            <div className="w-11/12 md:w-10/12 mx-auto h-[70vh]">
                <div className="carousel w-full h-[70vh]">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src={recent1}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src={recent2}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src={recent3}
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

export default RecentlyReleased;