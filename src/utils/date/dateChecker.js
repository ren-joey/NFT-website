/**
 * @description 兩個 new Date 時間比較器
 * @param {Date} currentDate 當前時間
 * @param {Date} targetDate 目標時間
 * @return {Number}
 *      - 0 未過目標時間
 *      - 1 已過目標時間
 *      - -1 與目標時間相同
 */
const dateChecker = (currentDate, targetDate) => {
    if (currentDate.valueOf() > targetDate.valueOf()) return 1;
    if (currentDate.valueOf() < targetDate.valueOf()) return 0;
    return -1;
};

export { dateChecker as default };
export { dateChecker };
