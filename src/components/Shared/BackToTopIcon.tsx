import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { scrollToTop } from 'src/animation/scrollToTrigger';
import 'src/components/Shared/BackToTopIcon.scss';

const BackToTop = () => {
    const [display, setDisplay] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        const backToTopIcon = document.getElementById('backToTopIcon');

        if (backToTopIcon) {
            gsap.fromTo(backToTopIcon, {opacity: 0}, {
                opacity: 1,
                duration: 0.3,
                scrollTrigger: {
                    trigger: '#root',
                    start: 'top -500',
                    toggleActions: 'restart none none reverse',
                    onToggle: (self) => {
                        if (!mounted.current) return;
                        if (self.direction === -1 && self.progress === 0) {
                            setDisplay(false);
                        } else {
                            setDisplay(true);
                        }
                    }
                }
            });
        }

        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        <div
            id="backToTopIcon"
            className={`back-to-top-area ${display ? '' : 'pointer-events-none'}`}
            onClick={() => { scrollToTop(); }}
        >
            <div className="back-to-top-icon"></div>
            <div className="fire-icon"></div>
        </div>
    );
};

export default BackToTop;