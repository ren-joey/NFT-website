import gsap, { Power3 } from 'gsap';
import gaParser from 'src/functions/gaParser';

const scrollToElement = (
    target: string|Element|undefined,
    offsetY = 200
) => {
    gsap.to(window, {
        duration: 1, scrollTo: {
            y: target,
            offsetY
        },
        ease: Power3.easeOut
    });
};

const scrollToElementByX = (
    container: gsap.TweenTarget,
    target: string|Element|undefined,
    offsetX = 200
) => {
    gsap.to(container, {
        duration: 0.3, scrollTo: {
            x: target,
            offsetX
        },
        ease: Power3.easeOut
    });
};

const scrollToOffset = (offset: number) => {
    gsap.to(window, {
        scrollTo: {y: 0},
        ease: Power3.easeOut
    });
};


const scrollToRoadmap = () => {
    gaParser('主站', 'ROADMAP', '0303版網站');
    scrollToElement('.roadmap', 60);
};

const scrollToFaq = () => {
    gaParser('主站', 'FAQ', '0303版網站');
    scrollToElement('#FAQ', 60);
};

const scrollToTop = () => {
    scrollToOffset(0);
};

export {
    scrollToElementByX,
    scrollToRoadmap,
    scrollToTop,
    scrollToFaq
};