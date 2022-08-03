import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { getRandomNumber } from 'src/utils';

const getFloatingElementSpirit = (
    app: PIXI.Application,
    index: number,
    textures: PIXI.Texture[]
) => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    const idx = getRandomNumber(0, 3);
    const targetSize = getRandomNumber(20, 100);
    const element = new PIXI.Sprite(textures[idx]);
    const duration = getRandomNumber(5, 10);
    const side = getRandomNumber(0, 1);
    const widthPositionRate = side
        ? getRandomNumber(0, 49) / 100
        : getRandomNumber(51, 100) / 100;
    element.position.set(
        width * widthPositionRate,
        height * (getRandomNumber(4, 6) / 10)
    );
    element.zIndex = 4;
    element.alpha = 0;
    element.anchor.set(0.5, 0.5);
    element.width = 0;
    element.height = 0;
    const tl = gsap.timeline({delay: index * 0.02});
    tl.addLabel('Start');
    tl.to(element, {
        duration: 20,
        x: side
            ? '-=' + (10000 * (0.48 - widthPositionRate))
            : '+=' + (10000 * (widthPositionRate - 0.48))
    }, 'Start');
    tl.to(element, {
        duration: 20,
        y: '-=' + getRandomNumber(100, 1200)
    }, 'Start');
    tl.to(element, {
        duration,
        width: targetSize,
        height: targetSize
    }, 'Start');
    tl.to(element, {
        duration: getRandomNumber(3, 10),
        rotation: Math.PI / 180 * 365,
        repeat: -1,
        ease: 'none'
    }, 'Start');
    tl.to(element, {
        duration: 5,
        alpha: 1
    }, 'Start');
    return element;
};

export default getFloatingElementSpirit;