import { useEffect, useState } from 'react';
import Star from 'src/components/Shared/Star';
import 'src/components/AboutB/BAlienSlider.scss';

const BAlienSlider = () => {
    const [alienIdx, setAlienIndex] = useState(1);

    useEffect(() => {
        let prevIdx = 1;

        const interval = setInterval(() => {
            // let idx = getRandomNumber(1, 7);
            // if (idx === prevIdx) {
            //     idx = ((prevIdx + 1) % 7) || 1;
            // }
            prevIdx  = (prevIdx + 1) % 7 || 7;
            setAlienIndex(prevIdx);
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