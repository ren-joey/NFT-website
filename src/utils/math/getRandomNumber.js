/**
 * 取得 start 到 end 中間的任意正整數
 * @param {number} start 起始數
 * @param {number} end 結束數
 * @return {number} 返回一個隨機正整數
 */
const getRandomNumber = (start, end) => {
    const during = end - start + 1;
    const random = Math.random();
    return Math.floor(random * during) + start;
};

export { getRandomNumber as default };
export { getRandomNumber };
