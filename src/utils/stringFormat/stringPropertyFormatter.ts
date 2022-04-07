/**
 * @description
 * 文字參數替換器，
 * 將 str 中的 ${} 按照 properties 的順序，
 * 依序替換掉。
 * @param str 原始字串，要替換的參數位置請加入 ${} 符號
 * @param properties 要替換掉 ${} 符號的參數
 */
const stringPropertyFormatter = (
    str: string,
    properties: (string|number)[]
) => {
    for (let i = 0; i < properties.length; i += 1) {
        const property = properties[i];
        str.replace('${}', property.toString());
    }
};

export default stringPropertyFormatter;