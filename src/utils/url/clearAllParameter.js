/**
 * 網址參數清除器
 * @param {string} [url] 目標url(選填，預設值為當前網址)
 * @returns {string} 清除後的完整網址
 */
const clearAllParameter = (url = window.location.href) => {
    const urlparts = url.split('?');
    return urlparts[0];
};

export { clearAllParameter as default };
export { clearAllParameter };
