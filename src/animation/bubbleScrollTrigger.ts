import * as PIXI from 'pixi.js';
import gsap from "gsap";

const bubbleScrollTrigger = (sprites: PIXI.Sprite[]) => {
    const trigger = document.getElementById('root');
    const sharedSetting: gsap.DOMTarget | ScrollTrigger.Vars = {
        trigger,
        start: 'top top',
        scrub: true
    };
    const bubbleScrollTriggerSettings: gsap.TweenVars[] = [
        {
            y: -500,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=4000'
            }
        },
        {
            y: -500,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=5000'
            }
        },
        {
            y: -500,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=5000'
            }
        },
        {
            y: -200,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=30000'
            }
        },
        {
            y: -300,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=30000'
            }
        },
        {
            y: -300,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=8000'
            }
        },
        {
            y: -300,
            ease: 'none',
            scrollTrigger: {
                ...sharedSetting,
                end: '+=5000'
            }
        },
        {
            y: -300,
            ease: 'none',
            scrollTrigger: {
                trigger,
                start: 'top -1000',
                end: '+=20000',
                scrub: true
            }
        },
        {
            y: -300,
            ease: 'none',
            scrollTrigger: {
                trigger,
                start: 'top -1500',
                end: '+=12000',
                scrub: true
            }
        }
    ];

    const tl = gsap.timeline();

    for (let i = 0; i < bubbleScrollTriggerSettings.length; i++) {
        tl.to(
            sprites[i],
            bubbleScrollTriggerSettings[i]
        );
    }

    return tl;
};

export { bubbleScrollTrigger };