import { getRandomNumber } from './getRandomNumber';

/**
 * 取得隨機座標，此座標點會圍繞在 window 的外圍
 */
const getRandomOffsetOuter = () => {
    const offset = {};
    if (getRandomNumber(0, 1) === 0) {
        offset.top = (getRandomNumber(0, 1) * 120 - 10) / 100 * window.innerHeight;
        offset.left = getRandomNumber(-10, 110) / 100 * window.innerWidth;
    } else {
        offset.top = getRandomNumber(-10, 110) / 100 * window.innerHeight;
        offset.left = (getRandomNumber(0, 1) * 120 - 10) / 100 * window.innerWidth;
    }
    return offset;
};

export { getRandomOffsetOuter as default };
export { getRandomOffsetOuter };
