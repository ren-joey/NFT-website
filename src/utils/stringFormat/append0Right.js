/**
 * 右側補零工具
 * @param {string|number} str 原始字串或數字
 * @param {number} length 目標總長度
 * @returns {string} 補完零後的字串，其長度等於指定總長
 */
const append0Right = (str, length) => {
    if (str.length >= length) { return str; }
    return append0Right(`${str}0`, length);
};

export { append0Right as default };
export { append0Right };
