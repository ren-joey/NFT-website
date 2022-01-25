/**
 * 取得 start 到 end 中間的任意正整數ㄠ
 * @param {number} start 起始數
 * @param {number} end 結束數
 * @param {number[]} but 要排除的數字陣列
 * @return {number} 返回一個隨機正整數
 */
const getRandomNumberBut = (start, end, but = []) => {
    if (Math.abs(end - start + 1) < but.length) {
        throw new Error('排除的數字量過多，請檢查您的參數');
    }
    const during = end - start + 1;
    const random = Math.random();
    const res = Math.floor(random * during) + start;
    return (but.indexOf(res) > -1) ? getRandomNumberBut(start, end, but) : res;
};

export { getRandomNumberBut as default };
export { getRandomNumberBut };
