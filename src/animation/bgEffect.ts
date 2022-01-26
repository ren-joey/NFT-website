import * as PIXI from 'pixi.js';
import gsap, { Power1 } from 'gsap';
import { debounce } from 'lodash';
import speed_lines from 'src/assets/images/speed_lines.png';
import { getRandomNumber } from 'src/utils/math/getRandomNumber';

const pixiLoader = () => new Promise<any>((res) => {
    PIXI.Loader.shared
        .add('speed_lines', speed_lines)
        .load((loader, resources) => {
            res(resources);
        });
});

// const getDevice = () => window.innerWidth >= 992 ? 'desktop' : 'phone';

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

const getHeightRate = () => window.innerWidth >= 992 ? 0.3 : 0.2;

const bgEffectInit = () => {
    gsap.fromTo('#canvasArea', {opacity: 1}, {
        opacity: 0,
        scrollTrigger: {
            trigger: '#canvasArea',
            start: 'top top',
            end: '+=1000',
            scrub: true
        }
    });

    pixiLoader().then((resources) => {
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            width: window.innerWidth,
            height: 2500,
            backgroundAlpha: 0
        });

        const texture = resources.speed_lines.texture;
        const sprites: null|PIXI.Sprite[] = [];

        for (let i = 0; i < 7; i += 1) {
            const sprite = new PIXI.Sprite(texture);

            sprite.anchor.set(0.5, 0.5);
            sprite.position.set(window.innerWidth * 0.5, window.innerHeight * getHeightRate());
            sprite.scale.set(0, 0);
            sprite.rotation = Math.PI / 180 * getRandomNumber(0, 100);

            app.stage.addChild(sprite);

            speedLineAnimate(sprite, i);

            sprites.push(sprite);
        }

        window.addEventListener('resize', debounce(() => {
            for (let i = 0; i < sprites.length; i++) {
                app.renderer.resize(window.innerWidth, 2500);
                const sprite = sprites[i];
                sprite.position.set(window.innerWidth * 0.5, window.innerHeight * getHeightRate());
            }
        }, 100));
    });
};

export default bgEffectInit;