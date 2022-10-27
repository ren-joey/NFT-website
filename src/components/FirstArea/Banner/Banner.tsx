import { Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectCube, EffectFade } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Banner.scss';
// import SwiperButtonNext from './SwiperButtonNext';
// import SwiperButtonPrev from './SwiperButtonPrev';
// import { useEffect } from 'react';

const Banner = () => {
    return (
        <div className="swiper-banner">
            <Swiper
            // install Swiper modules
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                // loop={true}
                autoplay={{
                    delay: 3000
                }}
                // navigation
                // onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {/* <SwiperButtonPrev />
                <SwiperButtonNext /> */}
                <SwiperSlide>
                    <div className="banner idx-1"></div>
                </SwiperSlide>
                {/* <SwiperSlide>
                    <div className="banner idx-2"></div>
                </SwiperSlide> */}
            </Swiper>
        </div>
    );
};

export default Banner;