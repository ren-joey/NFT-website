import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import AboutB from "src/components/AboutB/AboutB";
import BgEffects from "src/components/BgEffects";
import FirstArea from "src/components/FirstArea/FirstArea";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Roadmap from "src/components/Roadmap/Roadmap";
import { RwdContext } from "src/Context/RwdContext";
import 'src/views/FrontPage.scss';

gsap.registerPlugin(ScrollTrigger);

const FrontPage = () => {
    const [device, setDevice] = useState(window.innerWidth >= 992 ? 'desktop' : 'phone');

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                setDevice('desktop');
            } else {
                setDevice('phone');
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    targets: '.header',
                    className: 'header-scrolled'
                }
            }
        })

        tl.to('.speed-lines', {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                start: 'top top',
                end: 'bottom 30%',
                scrub: true
            }
        }).set('.speed-lines', {
            scrollTrigger: {
                start: 'bottom top',
                toggleClass: {
                    targets: '.speed-lines',
                    className: 'd-none'
                },
                scrub: true
            }
        });
    }, []);

    return (
        <RwdContext.Provider value={{ device }}>
            <div className="fp-wrapper">
                <Header />

                <div className="fp-container">
                    <FirstArea />

                    <AboutB />

                    <Roadmap />
                </div>

                <Footer />

                <BgEffects />

                {/* <div className="fp-preview"></div> */}
            </div>
        </RwdContext.Provider>
    );
}

export default FrontPage;