import gsap, { Power1 } from 'gsap';
import * as PIXI from 'pixi.js';
import { getRandomNumber } from 'src/utils';
import ResizeListener from 'src/functions/ResizeListener';

const getHeightRate = () => window.innerWidth >= 992 ? 0.4 : 0.2;

const speedLineAnimate = (sprite: PIXI.Sprite, delay = 0) => {
    const tl = gsap.timeline({
        delay,
        repeat: -1,
        repeatDelay: 1
    });
    tl.addLabel('Start');

    const scaleRate = window.innerWidth >= 992 ? 4 : 3;
    tl.to(sprite.scale, {
        duration: 6,
        x: scaleRate,
        y: scaleRate,
        ease: Power1.easeOut
    }, 'Start').to(sprite, {
        duration: 3,
        alpha: 0,
        ease: Power1.easeOut
    }, 'Start+=3');
};

const getSpeedLineContainer = (
    texture: PIXI.Texture
) => {
    const speedLineContainer = new PIXI.Container();
    const sprites: null|PIXI.Sprite[] = [];

    for (let i = 0; i < 7; i += 1) {
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(window.innerWidth * 0.5, window.innerHeight * getHeightRate());
        sprite.scale.set(0, 0);
        sprite.rotation = Math.PI / 180 * getRandomNumber(0, 100);

        speedLineAnimate(sprite, i);
        speedLineContainer.addChild(sprite);
        sprites.push(sprite);
    }

    // 畫面寬度改變時重置定位
    ResizeListener.add(() => {
        for (let i = 0; i < sprites.length; i++) {
            const sprite = sprites[i];
            sprite.position.set(window.innerWidth * 0.5, window.innerHeight * getHeightRate());
        }
    });

    // 往下滾動時特效消失
    gsap.fromTo(speedLineContainer, {
        y: 0,
        alpha: 1
    }, {
        y: -1000,
        alpha: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '#root',
            start: 'top top',
            end: '+=1000',
            scrub: true
        }
    });

    return speedLineContainer;
};

export default getSpeedLineContainer;