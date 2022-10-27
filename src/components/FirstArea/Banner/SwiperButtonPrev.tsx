import { getResources } from 'src/functions/loader';
import { useSwiper } from 'swiper/react';

const SwiperButtonPrev = () => {
    const swiper = useSwiper();
    return (
        <div
            className="slider-arrow left"
            style={
                { backgroundImage: `url(${getResources('arrow_right_shadow')})` }
            }
            onClick={() => swiper.slidePrev()}
        >
        </div>
    );
};

export default SwiperButtonPrev;