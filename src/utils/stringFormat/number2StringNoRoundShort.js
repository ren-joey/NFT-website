/**
 * 將數字加上逗號
 * @param {number} number 數字(1~n)
 * @returns {string} 返回數字加上逗號，如 1万, 1.5万
 */
const number2StringNoRoundShort = (num) => {
    let number;
    let float;
    let digit = '';
    if (num >= 10000) {
        number = Math.floor(num / 10000);
        float = num % 10000;
        float /= 10000;
        float = float.toString().split('0').join('');
        digit = '万';
    } else if (num >= 1000) {
        number = Math.floor(num / 1000);
        float = num % 1000;
        float = float.toString().split('0').join('');
        digit = '千';
    } else {
        number = num;
    }
    number = number.toString().split('').reverse();
    for (let i = 0; i < number.length; i += 1) {
        if ((i + 1) % 4 === 0) {
            number.splice(i, 0, ',');
        }
    }
    if (float) {
        number = (number.reverse().join('')) + float;
    } else {
        number = (number.reverse().join(''));
    }
    return `${number}${digit}`;
};

export { number2StringNoRoundShort as default };
export { number2StringNoRoundShort };
