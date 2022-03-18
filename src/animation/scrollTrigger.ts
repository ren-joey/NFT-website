import gsap, { Back } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// const clearStyles = (dom: null|Element) => {
//     if (dom) dom.removeAttribute('style');
// };

const scrollTriggerKillAll = () => {
    ScrollTrigger.getAll().forEach((scrollTrigger) => {
        if (scrollTrigger.vars.id) {
            scrollTrigger.endAnimation();
            scrollTrigger.kill();
        }
    });
};

const getDomByQueryAndClearStyles = (query: string) => {
    const dom = document.querySelector(query) as (HTMLElement|null);
    // clearStyles(dom);
    return dom;
};

const getDomByIdAndClearStyles = (id: string) => {
    const dom = document.getElementById(id);
    // clearStyles(dom);
    return dom;
};

const ifDomExistDo = (query: string, callback: (dom: HTMLElement) => void) => {
    let dom: null|HTMLElement = null;
    if (query[0] === '#') dom = getDomByIdAndClearStyles(query.slice(0 - query.length + 1));
    else dom = getDomByQueryAndClearStyles(query);
    if (dom !== null) {
        callback(dom as HTMLElement);
    }
};

let initialized = false;

const scrollTriggerInit = () => {
    if (window.scrollY !== 0) return;
    if (initialized) return;
    initialized = true;

    const scrubAndSelfKill = {
        scrub: true,
        onLeave: (self: any) => {
            self.kill(false, true);
        }
    };

    /* linear scroll trigger */
    const tl = gsap.timeline();

    ifDomExistDo('#aboutBContent', (dom) => {
        tl.fromTo(dom, {
            y: -100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 80%',
                end: 'bottom center'
            }
        });
    });

    ifDomExistDo('#aboutBLine', (dom) => {
        tl.fromTo(dom, { scaleY: 0 },{
            scaleY: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 70%',
                end: `+=280`
            }
        });
    });

    for (let i = 1; i <= 5; i += 1) {
        ifDomExistDo(`#featureCard${i}`, (dom) => {
            const rate = window.innerWidth >= 992 ? '90' : '70';
            tl.fromTo(dom, {
                y: -50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    ...scrubAndSelfKill,
                    id: dom.id,
                    trigger: dom,
                    start: `top ${rate}%`,
                    end: '+=100'
                }
            });
        });
    }

    ifDomExistDo('#featureCardRow1', (dom) => {
        const cards = document.querySelectorAll('#featureCardRow1 .feature-card');
        tl.fromTo(cards, {
            y: -100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 80%',
                end: 'top 10%'
            },
            stagger: 0.15
        });
    });

    ifDomExistDo('#lineTurningAround', (dom) => {
        tl.fromTo(dom, { height: 0 }, {
            height: 537,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 70%',
                end: '+=537'
            }
        });
    });

    ifDomExistDo('#featureCardRow2', (dom) => {
        const cards = document.querySelectorAll('#featureCardRow2 .feature-card');
        tl.fromTo(cards, {
            y: -100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 80%',
                end: 'top 10%'
            },
            stagger: 0.15
        });
    });

    ifDomExistDo('#lineTurningLeft', (dom) => {
        tl.fromTo(dom, {height: 0},  {
            height: 537,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 70%',
                end: '+=537'
            }
        });
    });

    ifDomExistDo('#roadmapLine', (dom) => {
        tl.fromTo(dom, { scaleY: 0 }, {
            scaleY: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top center',
                end: () => window.innerWidth >= 992 ? '+=2320' : '+=300'
            }
        });
    });

    ifDomExistDo('#aboutBPhoneLine', (dom) => {
        tl.fromTo(dom, {scaleY: 0}, {
            scaleY: 1,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: dom.id,
                trigger: dom,
                start: 'top 70%',
                end: `+=1300`
            }
        });
    });

    const phoneLines = document.querySelectorAll('.phone-line');
    if(phoneLines.length) {
        phoneLines.forEach((line, idx) => {
            tl.fromTo(line,{
                scaleY: 0,
                duration: 0.5
            } ,  {
                scaleY: 1,
                scrollTrigger: {
                    id: `phoneLine${idx}`,
                    trigger: line,
                    start: 'top 70%'
                }
            });
        });
    }

    const cards = document.querySelectorAll('.roadmap-card');
    if (cards.length) {
        cards.forEach((card, idx) => {
            tl.fromTo(card, {
                y: -100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    ...scrubAndSelfKill,
                    id: `roadmapCard${idx}`,
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom center'
                }
            });
        });
    }

    const timeLabels = document.querySelectorAll('.roadmap-time');
    if (timeLabels.length) {
        timeLabels.forEach((label, idx) => {
            tl.fromTo(label, {scale: 0},{
                scale: 1,
                duration: 0.5,
                ease: Back.easeOut,
                scrollTrigger: {
                    ...scrubAndSelfKill,
                    id: `roadmapTime${idx}`,
                    trigger: label,
                    start: 'top 80%',
                    end: '+=200'
                }
            });
        });
    }

    ifDomExistDo('#lineTurningSkew', (dom) => {
        tl.fromTo(dom, { height: 0 }, {
            height: 337,
            scrollTrigger: {
                ...scrubAndSelfKill,
                id: 'lineTurningSkew',
                trigger: dom,
                start: 'top center',
                end: '+=100'
            }
        });
    });

    return tl;
};

export {
    scrollTriggerInit,
    scrollTriggerKillAll
};