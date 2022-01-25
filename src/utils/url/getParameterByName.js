/**
 * 網址參數取得器
 * @param {string} name 參數名稱
 * @param {string} [url] 目標url(選填，預設值為當前網址)
 * @returns {string} 結果參數值
 */
const getParameterByName = (name, url = window.location.href) => {
    const formatName = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${formatName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export { getParameterByName as default };
export { getParameterByName };
