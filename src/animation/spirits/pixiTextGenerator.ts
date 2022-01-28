import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { getRandomNumber } from 'src/utils';
import textWarning from 'src/animation/text/warning';
import { shuffle } from 'lodash';

// const getHex = (min: number, max: number) => getRandomNumber(min, max).toString(16);

// const getYellowRandom = () => parseInt(
//     `${getHex(200, 255)}${getHex(200, 255)}${getHex(10, 50)}`,
//     16
// );

// const getOrangeRandom = () => parseInt(
//     `${getHex(200, 255)}${getHex(70, 155)}${getHex(10, 50)}`,
//     16
// );

// const getPurpleRandom = () => parseInt(
//     `${getHex(200, 255)}${getHex(10, 50)}${getHex(200, 255)}`,
//     16
// );

// const getTintRandom = () => parseInt(
//     `${getHex(10, 50)}${getHex(200, 255)}${getHex(200, 255)}`,
//     16
// );

// const getRGB = () => getRandomNumber(0, 1)
//     ? getPurpleRandom
//     : getRandomNumber(0, 1)
//         ? getYellowRandom()
//         : getTintRandom();

const rateMap = [0.7, 0, 0.9, 0.21];
const fontMap = [30, 46, 40, 22];
const colorMap = shuffle([
    0x00fffc,
    0xff00dd,
    0x6dff00,
    0xff6000
]);

const pixiTextGenerator = (idx: number) => {
    const side = idx % 2;
    const width = window.innerWidth;
    const widthRate = rateMap[idx];
    // const widthRate = side
    //     ? getRandomNumber(0, 2) * 0.1
    //     : getRandomNumber(8, 10) * 0.1;
    const fill = colorMap[idx];
    const height = window.innerHeight;
    const delay = (getRandomNumber(0, 10) / 10) + 2;
    // const fontSize = getRandomNumber(24, 48);
    const fontSize = fontMap[idx];
    const lineHeight = fontSize * 1.08;
    const duration = 12;
    const text = new PIXI.Text(textWarning,{
        fontFamily: 'a4-speed',
        fontWeight: 'bolder',
        lineHeight,
        fontSize,
        fill,
        // fill: getRGB(),
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