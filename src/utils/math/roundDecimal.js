/**
 * 四捨五入至小數點 Ｎ 位數
 * @param {Number} val 原始數
 * @param {Number} precision 四捨五入至小數點第 N 位
 */
const roundDecimal = (val, precision) => Math.round(val * (10 ** precision)) / (10 ** precision); // eslint-disable-line

export { roundDecimal as default };
export { roundDecimal };
