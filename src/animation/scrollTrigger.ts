import gsap, { Back } from "gsap";

const scrollTriggerInit = () => {
    gsap.set('.header', {
        scrollTrigger: {
            start: 'top -50',
            end: 99999,
            toggleClass: {
                targets: '.header',
                className: 'header-scrolled'
            }
        }
    });

    gsap.to('#canvasArea', {
        opacity: 0,
        scrollTrigger: {
            trigger: '#canvasArea',
            start: 'top top',
            end: '+=1000',
            scrub: true
        }
    });

    gsap.from('#aboutBContent', {
        y: -100,
        opacity: 0,
        scrollTrigger: {
            trigger: '#aboutBContent',
            start: 'top 80%',
            end: 'bottom center',
            scrub: true
        }
    });

    gsap.from('#aboutBLine', {
        height: 0,
        scrollTrigger: {
            trigger: '#aboutBLine',
            start: 'top 70%',
            end: '+=280',
            scrub: true
        }
    });

    gsap.from('#roadmapLine', {
        scaleY: 0,
        scrollTrigger: {
            trigger: '#roadmapLine',
            start: 'top center',
            end: () => window.innerWidth >= 992 ? '+=2100' : '+=300',
            scrub: true
        }
    });

    for (let i = 1; i <= 5; i += 1) {
        const featureCard = document.getElementById(`featureCard${i}`);
        if (featureCard) {
            gsap.from(featureCard, {
                y: -50,
                opacity: 0,
                scrollTrigger: {
                    trigger: featureCard,
                    start: 'top 90%',
                    end: '+=100',
                    scrub: true
                }
            });
        }
    }

    const featureCardsRow1 = document.getElementById('featureCardRow1');
    if (featureCardsRow1) {
        const cards = document.querySelectorAll('#featureCardRow1 .feature-card');
        gsap.from(cards, {
            y: -100,
            opacity: 0,
            scrollTrigger: {
                trigger: featureCardsRow1,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true
            },
            stagger: 0.1
        });
    }

    const lineTurningAround = document.getElementById('lineTurningAround');
    if (lineTurningAround) {
        gsap.from(lineTurningAround, {
            height: 0,
            scrollTrigger: {
                trigger: lineTurningAround,
                start: 'top 70%',
                end: '+=330',
                scrub: true
            }
        });
    }

    const featureCardsRow2 = document.getElementById('featureCardRow2');
    if (featureCardsRow2) {
        const cards = document.querySelectorAll('#featureCardRow2 .feature-card');
        gsap.from(cards, {
            y: -100,
            opacity: 0,
            scrollTrigger: {
                trigger: featureCardsRow2,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true
            },
            stagger: 0.1
        });
    }

    const lineTurningLeft = document.getElementById('lineTurningLeft');
    if (lineTurningLeft) {
        gsap.from(lineTurningLeft, {
            height: 0,
            scrollTrigger: {
                trigger: lineTurningLeft,
                start: 'top 70%',
                end: '+=330',
                scrub: true
            }
        });
    }

    const phoneLineById = document.getElementById('aboutBPhoneLine');
    if (phoneLineById) {
        gsap.from(phoneLineById, {
            height: 0,
            scrollTrigger: {
                trigger: '.feature-card-row',
                start: 'top 70%',
                end: '+=1500',
                scrub: true
            }
        });
    }

    const phoneLines = document.querySelectorAll('.phone-line');
    if(phoneLines.length) {
        phoneLines.forEach((line) => {
            gsap.from(line, {
                scaleY: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: line,
                    start: 'top 70%',
                    toggleActions: 'play none reverse none'
                }
            });
        });
    }

    const cards = document.querySelectorAll('.roadmap-card');
    if (cards.length) {
        cards.forEach((card) => {
            gsap.from(card, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom center',
                    scrub: true
                }
            });
        });
    }

    const timeLabels = document.querySelectorAll('.roadmap-time');
    if (timeLabels.length) {
        timeLabels.forEach((label) => {
            gsap.fromTo(label, {scale: 0},{
                scale: 1,
                duration: 0.5,
                ease: Back.easeOut,
                scrollTrigger: {
                    trigger: label,
                    start: 'top 80%',
                    end: '+=200'
                    // toggleActions: 'play none reverse none'
                }
            });
        });
    }

    const lineTurningSkew = document.getElementById('lineTurningSkew');
    if (lineTurningSkew) {
        gsap.from(lineTurningSkew, {
            height: 0,
            scrollTrigger: {
                trigger: lineTurningSkew,
                start: 'top center',
                end: '+=100',
                scrub: true
            }
        });
    }

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

export { scrollTriggerInit };