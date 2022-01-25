import { offsetFinder } from './offsetFinder';

/**
 * 將 nodeElement 複製並以 fixed 定位貼到 body 中
 * @param {Object} target 要複製的目標 nodeElement
 * @param {number} [zIndex] 指定的 z-index 層級，預設為 1
 * @returns {Object} 返回複製的 jQuery dom 對象
 */
const copyPasteFixed = (target, zIndex = 1) => {
    const offset = offsetFinder(target);
    const clone = target.cloneNode(true);
    clone.setAttribute('style', `
    position: fixed;
    left: ${offset.left}px;
    top: ${offset.top}px;
    width: ${target.offsetWidth}px;
    height: ${target.offsetHeight}px;
    'z-index': ${zIndex};
    `);
    document.body.appendChild(clone);
    return clone;
};

export { copyPasteFixed as default };
export { copyPasteFixed };
