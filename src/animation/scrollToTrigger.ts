import gsap, { Power3 } from 'gsap';

const scrollToElement = (target: string) => {
    gsap.to(window, {
        duration: 1, scrollTo: {
            y: target,
            offsetY: 200
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
    scrollToElement('.roadmap');
};

const scrollToTop = () => {
    scrollToOffset(0);
};

export { scrollToRoadmap, scrollToTop };