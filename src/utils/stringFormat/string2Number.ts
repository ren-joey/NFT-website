/**
 * 將字串中的第一組數字轉換為數字格式回傳
 * @param str - 要轉換的字串，如 '100px'
 * @returns 回傳數字，如果傳入空值則回應 1
 */
const string2Number = (str: string): number => {
    if (!str || str === 'none') return null;
    const re = /\d+/gm;
    return +(re.exec(str).join(''));
};

export { string2Number as default };
export { string2Number };
