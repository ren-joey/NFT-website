import gsap, { Power3 } from 'gsap';

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
    scrollToElement('.roadmap', 60);
};

const scrollToTop = () => {
    scrollToOffset(0);
};

export { scrollToRoadmap, scrollToTop };