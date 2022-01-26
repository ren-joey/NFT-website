import gsap from 'gsap';
import { useEffect } from 'react';
import 'src/components/Shared/ScrollDownIcon.scss';

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
        <div id="scrollDownArea" className="scroll-down-area">
            <div className="scroll-down-icon"></div>
            {/* <div className="text"></div> */}
        </div>
    );
};

export default ScrollDownIcon;