/**
 * 將數字加上逗號
 * @param {number} number 數字(1~n)
 * @returns {string} 返回數字加上逗號，如 10,000
 */
const number2String = (num) => {
    const isFloat = num.toString().indexOf('.') !== -1;
    const nunInt = isFloat ? num.toString().split('.')[0] : num;
    const number = nunInt.toString().split('').reverse();
    for (let i = 0; i < number.length; i += 1) {
        if ((i + 1) % 4 === 0) {
            number.splice(i, 0, ',');
        }
    }
    return isFloat ? `${number.reverse().join('')}.${num.toString().split('.')[1]}` : number.reverse().join('');
};

export { number2String as default };
export { number2String };
