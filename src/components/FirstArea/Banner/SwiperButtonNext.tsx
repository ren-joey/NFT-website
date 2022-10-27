import { getResources } from 'src/functions/loader';
import { useSwiper } from 'swiper/react';

const SwiperButtonNext = () => {
    const swiper = useSwiper();
    return (
        <div
            className="slider-arrow right"
            style={
                { backgroundImage: `url(${getResources('arrow_right_shadow')})` }
            }
            onClick={() => swiper.slideNext()}
        >
        </div>
    );
};

export default SwiperButtonNext;