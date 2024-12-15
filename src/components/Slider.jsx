import sliderImg1 from '../assets/sliderImg1.jpg'
import sliderImg2 from '../assets/sliderImg2.jpg'
import sliderImg3 from '../assets/sliderImg3.jpg'
import sliderImg4 from '../assets/sliderImg4.jpg'
import sliderImg5 from '../assets/sliderImg5.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div>
                        <img src={sliderImg1} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={sliderImg2} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={sliderImg3} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={sliderImg4} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={sliderImg5} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slider;