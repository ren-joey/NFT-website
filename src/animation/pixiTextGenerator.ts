import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { getRandomNumber } from 'src/utils';

const getHex = (min: number, max: number) => getRandomNumber(min, max).toString(16);

const getRGB = () => getRandomNumber(0, 1)
    ? parseInt(`${getHex(200, 255)}${getHex(10, 50)}${getHex(200, 255)}`, 16)
    : getRandomNumber(0, 1)
        ? parseInt(`${getHex(200, 255)}${getHex(200, 255)}${getHex(10, 50)}`, 16)
        : parseInt(`${getHex(10, 50)}${getHex(200, 255)}${getHex(200, 255)}`, 16);

const pixiTextGenerator = (idx: number) => {
    const rateMap = [0.7, 0, 0.9, 0.21];
    const fontMap = [30, 46, 40, 22];

    const side = idx % 2;
    const width = window.innerWidth;
    const widthRate = rateMap[idx];
    // const widthRate = side
    //     ? getRandomNumber(0, 2) * 0.1
    //     : getRandomNumber(8, 10) * 0.1;
    const height = window.innerHeight;
    const delay = getRandomNumber(0, 20) / 10;
    // const fontSize = getRandomNumber(24, 48);
    const fontSize = fontMap[idx];
    const lineHeight = fontSize * 1.08;
    const duration = 12;
    const text = new PIXI.Text(`
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING
    WARNING`,{
        fontFamily: 'a4-speed',
        fontWeight: 'bolder',
        lineHeight,
        fontSize,
        fill: getRGB(),
        // fill : 0xde6ef1,
        // fill : 0xffff00,
        align : 'center'
    });

    text.zIndex = 3;
    text.position.set(
        width * widthRate,
        height * 0.6);
    gsap.to(text, {
        y: 0 - (text.height * 1.2),
        duration,
        ease: 'none',
        delay
    });
    text.transform.skew.y = Math.PI / 180 * (side ? 15 : -15);

    return text;
};

export { pixiTextGenerator };