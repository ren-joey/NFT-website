import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import ResizeListener from 'src/functions/ResizeListener';

const getFrontEndBgSprite = (texture: PIXI.Texture) => {
    const trigger = document.getElementById('root') as HTMLElement;
    const bgContainer = new PIXI.Container();
    const bgSprite = new PIXI.Sprite(texture);
    let animate: gsap.core.Tween | undefined;

    const positioning = () => {
        const width = window.innerWidth;
        const height = trigger.offsetHeight;
        const scrollingRange = height - window.innerHeight;
        bgSprite.width = width;
        bgSprite.height = height;

        if (animate) animate.kill();
        animate = gsap.fromTo(bgSprite, { y: 0 }, {
            y: -scrollingRange,
            scrollTrigger: {
                trigger,
                start: 'top top',
                end: '+=' + scrollingRange,
                scrub: true
            }
        });
    };

    positioning();
    ResizeListener.add(positioning);

    bgContainer.addChild(bgSprite);
    return bgContainer;
};

export default getFrontEndBgSprite;