/**
 * 將數字加上逗號
 * @param {number} number 數字(1~n)
 * @returns {string} 返回數字加上逗號，如 10,000
 */
const number2StringShort = (num) => {
    let number = num;
    let digit = '';
    if (num >= 10000000) {
        number = num / 10000000;
        digit = '千万';
    } else if (num >= 1000000) {
        number = num / 1000000;
        digit = '百万';
    } else if (num >= 10000) {
        number = num / 10000;
        digit = '万';
    } else {
        number = num;
    }
    number = number.toString().split('').reverse();
    for (let i = 0; i < number.length; i += 1) {
        if ((i + 1) % 4 === 0) {
            number.splice(i, 0, ',');
        }
    }
    return `${number.reverse().join('')}${digit}`;
};

export { number2StringShort as default };
export { number2StringShort };
