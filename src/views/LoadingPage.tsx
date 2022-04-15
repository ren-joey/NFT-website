import gsap, { Power0, Power4 } from "gsap";
import { RoughEase } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import loadingAnimation from "src/animation/loadingAnimation";
import BAlienSvg from "src/components/Shared/BAlienSvg";
import gaParser from "src/functions/gaParser";
import loader from "src/functions/loader";
import { getParameterByName } from "src/utils";
import 'src/views/LoadingPage.scss';

interface IProps {
    setFrontPageStatus: (param: boolean) => void
    setLoadingPageStatus: (param: boolean) => void
}

const LoadingPage = ({ setFrontPageStatus, setLoadingPageStatus }: IProps) => {
    const loaderIsReady = useRef(false);
    const trailerEndedRef = useRef(
        localStorage.getItem('skip-trailer') === 'true'
        || getParameterByName('auto-login')
    );
    const [trailerEnded, setTrailerEnded] = useState(trailerEndedRef.current);
    const tl = gsap.timeline();
    tl.addLabel('Start');
    tl.addLabel('Staged', '+=2');

    const trailerEnd = () => {
        trailerEndedRef.current = true;
        setTrailerEnded(true);
    };

    const hideLoadingPageAndShowFrontPage = () => {
        setFrontPageStatus(true);
        setLoadingPageStatus(false);
    };

    useEffect(() => {
        if (!trailerEnded) {
            loadingAnimation();

            const bAlienArea = document.getElementById('bAlienArea');
            const bAlienHead = document.getElementById('bAlienHead');

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
                    if (loaderIsReady.current) setFrontPageStatus(true);
                }
            }, 'Staged');

            tl.to(bAlienArea, {
                scale: 100,
                duration: 3,
                ease: Power4.easeIn
            }, 'Staged+=4');

            tl.to(['#loadingPage', '#skipTrailerBtn'], {
                duration: 2,
                opacity: 0,
                onComplete: () => {
                    if (loaderIsReady.current) hideLoadingPageAndShowFrontPage();
                    else trailerEnd();
                }
            }, 'Staged+=6');
        }

        loader().then(() => {
            if (trailerEndedRef.current) hideLoadingPageAndShowFrontPage();
            loaderIsReady.current = true;
        });
    }, []);

    const skipTrailer = () => {
        gaParser('主站', 'SKIP', '0303版網站');

        localStorage.setItem('skip-trailer', 'true');
        tl.progress(1, true);

        if (loaderIsReady.current) hideLoadingPageAndShowFrontPage();
        trailerEnd();
    };

    return (
        <div className="loading-wrapper">
            {
                trailerEnded && !loaderIsReady.current
                    ? (
                        <div className="loading-icon">
                            <BAlienSvg />
                            <br />
                            LOADING
                        </div>
                    ) : (
                        <div id="skipTrailerBtn" className="skip-trailer-btn" onClick={() => skipTrailer()}>
                            SKIP
                        </div>
                    )
            }

            <div id="loadingPage" className="loading-page">
                <div id="bAlienArea" className="b-alien-area">
                    { !trailerEnded && <BAlienSvg /> }
                    <div
                        id="bAlienHead"
                        className="review-head"
                    ></div>
                </div>
                <canvas id="loadingCanvas" />
            </div>
        </div>
    );
};

export default LoadingPage;