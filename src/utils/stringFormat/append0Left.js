/**
 * 左側補零工具
 * @param {string|number} str 原始字串或數字
 * @param {number} length 目標總長度
 * @returns {string} 補完零後的字串，其長度等於指定總長
 */
const append0Left = (str, length) => {
    if (typeof str === 'number') str = str.toString(); // eslint-disable-line
    if (str.length >= length) { return str; }
    return append0Left(`0${str}`, length);
};

export { append0Left as default };
export { append0Left };
