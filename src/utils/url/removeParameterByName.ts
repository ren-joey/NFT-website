/**
 * 網址參數移除器
 * @param parameter - 要刪除的參數名稱
 * @param url - 目標 url (預設值為當前網址)
 * @returns 清除指定參數後的網址
 */
const removeParameterByName = (
    parameter: string,
    url: string = window.location.href
): string => {
    // prefer to use l.search if you have a location/link object
    const urlparts = url.split('?');
    if (urlparts.length >= 2) {
        if (urlparts[0].indexOf('#/') !== -1) {
            const prefix = `${encodeURIComponent(parameter)}=`;
            const pars = urlparts[1].split(/[&]/g);

            // reverse iteration as may be destructive
            for (let i = pars.length - 1; i >= 0; i -= 1) {
            // idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
        }

        const idx = urlparts[1].lastIndexOf('#/');
        const lastStr = urlparts[1].substr(idx);
        urlparts[1] = urlparts[1].substr(0, idx);
        const prefix = `${encodeURIComponent(parameter)}=`;
        const pars = urlparts[1].split(/[&]/g);

        // reverse iteration as may be destructive
        for (let i = pars.length - 1; i >= 0; i -= 1) {
            // idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '') + lastStr;
    }
    return url;
};

export { removeParameterByName as default };
export { removeParameterByName };
