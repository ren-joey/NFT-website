import gsap from "gsap";

const bubbleScrollTrigger = () => {
    gsap.to('#bubble1', {
        top: '-500px',
        ease: 'none',
        scrollTrigger: {
            start: 'top top',
            end: '+=4000',
            scrub: true
        }
    });

    gsap.to('#bubble2', {
        top: '-500px',
        ease: 'none',
        scrollTrigger: {
            start: 'top top',
            end: '+=5000',
            scrub: true
        }
    });

    gsap.to('#bubble3', {
        top: '-500px',
        ease: 'none',
        scrollTrigger: {
            start: 'top top',
            end: '+=5000',
            scrub: true
        }
    });

    gsap.to('#bubble4', {
        top: '-=200px',
        ease: 'none',
        scrollTrigger: {
            start: 'top top',
            end: '+=10000',
            scrub: true
        }
    });

    gsap.to('#bubble5', {
        top: '-=300px',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=10000',
            scrub: true
        }
    });

    gsap.to('#bubble6', {
        top: '-=300px',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=8000',
            scrub: true
        }
    });

    gsap.to('#bubble7', {
        top: '-=300px',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=5000',
            scrub: true
        }
    });

    gsap.to('#bubble8', {
        top: '-300px',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top -1000',
            end: '+=3000',
            scrub: true
        }
    });

    gsap.to('#bubble9', {
        top: '-300px',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top -1500',
            end: '+=6000',
            scrub: true
        }
    });
};

export { bubbleScrollTrigger };