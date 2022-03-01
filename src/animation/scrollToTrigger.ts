import gsap, { Power3 } from 'gsap';
import gaParser from 'src/functions/gaParser';

const scrollToElement = (target: string, offsetY = 200) => {
    gsap.to(window, {
        duration: 1, scrollTo: {
            y: target,
            offsetY
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

const scrollToTop = () => {
    scrollToOffset(0);
};

export { scrollToRoadmap, scrollToTop };