import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import ResizeListener from 'src/functions/ResizeListener';

const getStarContainer = (texture: PIXI.Texture) => {
    const scrollingRange = 200;
    const trigger = document.getElementById('root') as HTMLElement;
    const container = new PIXI.Container();
    const sprite = new PIXI.TilingSprite(texture);
    sprite.position.set(0, 0);
    let animate: gsap.core.Tween | undefined;

    const positioning = () => {
        sprite.width = window.innerWidth;
        sprite.height = window.innerHeight + scrollingRange;

        if (animate) animate.kill();
        animate = gsap.fromTo(sprite, { y: 0 }, {
            y: -scrollingRange,
            scrollTrigger: {
                trigger,
                start: 'top top',
                end: '+=' + trigger.offsetHeight,
                scrub: true
            }
        });
    };

    positioning();
    ResizeListener.add(positioning);

    container.addChild(sprite);
    return container;
};

export default getStarContainer;
