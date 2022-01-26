import { useEffect, useState } from 'react';
import { getRandomNumber } from 'src/utils/math/getRandomNumber';
import 'src/components/AboutB/BAlienSlider.scss';
import Star from '../Shared/Star';

const BAlienSlider = () => {
    const [alienIdx, setAlienIndex] = useState(1);

    useEffect(() => {
        let prevIdx = 1;

        const interval = setInterval(() => {
            let idx = getRandomNumber(1, 6);
            if (idx === prevIdx) {
                idx = ((prevIdx + 1) % 6) || 1;
            }

            setAlienIndex(idx);
            prevIdx = idx;
        }, 200);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <div className="b-alien-slider">
            <div className={`b-alien idx-${alienIdx}`}></div>
            {
                Array.from({ length: 5 }, (_, i) => (
                    <div
                        className={`star-container idx-${i + 1}`}
                        key={i}
                    >
                        <Star />
                    </div>)
                )
            }
        </div>
    );
};

export default BAlienSlider;