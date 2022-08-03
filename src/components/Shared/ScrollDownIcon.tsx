import gsap from 'gsap';
import { useEffect } from 'react';
import 'src/components/Shared/ScrollDownIcon.scss';
import { getResources } from 'src/functions/loader';

const ScrollDownIcon = () => {
    useEffect(() => {
        gsap.to('#scrollDownArea', {
            opacity: 0,
            duration: 0.3,
            scrollTrigger: {
                trigger: '#root',
                start: 'top top',
                end: '+=100',
                toggleActions: 'restart none reverse none'
            }
        });
    }, []);

    return (
        <div
            id="scrollDownArea"
            className="scroll-down-area"
        >
            {
                Array.from({ length: 3 }, (_, i) => (
                    <div
                        className={`arrow idx-${i + 1}`}
                        key={i}
                        style={
                            {backgroundImage: `url(${getResources('arrow_down')})`}
                        }
                    />
                ))
            }
        </div>
    );
};

export default ScrollDownIcon;