/**
 * 陣列加總器
 * @param {Array} arr 欲加總的陣列
 * @returns {Number} 陣列加總的總數
 */
const sumReduce = (arr) => {
    if (arr.length === 0) return 0;
    // const _arr = JSON.parse(JSON.stringify(arr));
    return arr.reduce((a, b) => a + b);
};

export { sumReduce as default };
export { sumReduce };
