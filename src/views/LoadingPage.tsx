import gsap, { Power0, Power4 } from "gsap";
import { RoughEase } from "gsap/all";
import { useEffect } from "react";
import loadingAnimation from "src/animation/loadingAnimation";
import BAlienSvg from "src/components/Shared/BAlienSvg";
import loader from "src/functions/loader";
import { getParameterByName } from "src/utils";
import 'src/views/LoadingPage.scss';

interface IProps {
    setLoadingStatus: (param: boolean) => void
    setLoadingPageStatus: (param: boolean) => void
}

const LoadingPage = ({ setLoadingStatus, setLoadingPageStatus }: IProps) => {
    useEffect(() => {
        loadingAnimation();

        const bAlienArea = document.getElementById('bAlienArea');
        const bAlienHead = document.getElementById('bAlienHead');
        const tl = gsap.timeline();
        tl.addLabel('Start');
        tl.addLabel('Staged', '+=2');

        tl.fromTo(bAlienArea, {height: 0}, {
            duration: 5,
            height: '70%'
        }, 'Start');

        tl.fromTo(bAlienArea, {y: -100}, {
            duration: 10,
            y: 0
        }, 'Start');

        tl.fromTo(bAlienArea, {y: -10}, {
            duration: 2,
            y: 10,
            repeat: -1,
            yoyo: true
        });

        tl.fromTo(bAlienHead, {opacity: 0}, {
            opacity: 1,
            duration: 1,
            yoyo: true,
            ease: RoughEase.ease.config({
                template: Power0.easeOut,
                strength: 3,
                points: 40,
                taper: "in",
                randomize: false,
                clamp: true
            }),
            repeatDelay: 2,
            repeat: 1,
            onComplete: () => {
                setLoadingStatus(true);
            }
        }, 'Staged');

        tl.to(bAlienArea, {
            scale: 100,
            duration: 3,
            ease: Power4.easeIn
        }, 'Staged+=4');

        const loadingPage = document.getElementById('loadingPage');
        tl.to(loadingPage, {
            duration: 2,
            opacity: 0,
            onComplete: () => {
                setLoadingPageStatus(false);
            }
        }, 'Staged+=6');

        loader().then(() => {
            if (getParameterByName('preview')) {
                setLoadingStatus(true);
                setLoadingPageStatus(false);
            }
        });
    }, []);

    return (
        <div id="loadingPage" className="loading-page">
            <div id="bAlienArea" className="b-alien-area">
                <BAlienSvg />
                <div id="bAlienHead" className="review-head"></div>
            </div>
            <canvas id="loadingCanvas" />
            {/* <div className="preview-bg"></div> */}
        </div>
    );
};

export default LoadingPage;