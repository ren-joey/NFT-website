import { TweenLite } from 'gsap';

/**
 * 批次 nodeElement 亮度調整
 * @param {number} percent 0~100 亮度百分比
 * @param  {...object} domArray
 */
const brightnessBatch = (percent, ...domArray) => {
    TweenLite.to(domArray, 0.5, { filter: `brightness(${percent}%)` });
    // domArray.forEach(dom => {
    //   dom.css('filter', 'brightness(' + percent + '%)')
    // })
};

export { brightnessBatch as default };
export { brightnessBatch };
