import gsap from "gsap";

const scrollTriggerInit = () => {
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
}

export { scrollTriggerInit };