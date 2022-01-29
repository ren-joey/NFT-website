import gsap from 'gsap';
import * as PIXI from 'pixi.js';

const getFrontEndBgSprite = (texture: PIXI.Texture) => {
    const trigger = document.getElementById('root') as HTMLElement;
    const width = window.innerWidth;
    const height = trigger.offsetHeight;
    const scrollingRange = height - window.innerHeight;
    const bgContainer = new PIXI.Container();
    const bgSprite = new PIXI.Sprite(texture);
    bgSprite.width = width;
    bgSprite.height = height;

    gsap.fromTo(bgSprite, { y: 0 }, {
        y: -scrollingRange,
        scrollTrigger: {
            trigger,
            start: 'top top',
            end: '+=' + scrollingRange,
            scrub: true
        }
    });

    bgContainer.addChild(bgSprite);
    return bgContainer;
};

export default getFrontEndBgSprite;