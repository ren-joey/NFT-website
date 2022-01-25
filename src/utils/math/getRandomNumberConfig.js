import { getRandomNumber } from './getRandomNumber';

/**
 * 從設定檔中隨機跑值
 * 本算式將會先乘積再偏移
 * @param {Object} obj 隨機設定
 * @param {Number|Function} obj.min 隨機數最小值
 * @param {Number|Function} obj.max 隨機數最大值
 * @param {Number|Function} obj.translate 隨機數最終偏移量，可為負數
 * @param {Number|Function} obj.scale 隨機數的最終乘積
 * @example
 *      obj = {
 *          min: 0,
 *          max: () => window.innerWidth * 2,
 *      translate: () => -window.innerWidth,
 *      scale: 1
 *      }
 */
const getRandomNumberConfig = (obj) => {
    const min = (typeof obj.min === 'number') ? obj.min : obj.min();
    const max = (typeof obj.max === 'number') ? obj.max : obj.max();
    const scale = (typeof obj.scale === 'number') ? obj.scale : obj.scale();
    const translate = (typeof obj.translate === 'number') ? obj.translate : obj.translate();
    return Math.floor((getRandomNumber(min, max) * scale) * 100) / 100 + translate; // eslint-disable-line max-len
};

export { getRandomNumberConfig as default };
export { getRandomNumberConfig };
