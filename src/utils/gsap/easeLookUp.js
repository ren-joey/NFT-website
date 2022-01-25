import * as gsap from 'gsap';

/**
 * 以字串搜尋最相近的 ease 方法
 * @param {String} str ease 字串
 * 目前不支援小數點
 */
const easeLookUp = (str = 'Power1.easeOut') => {
    if (!str) return gsap.Power1.easeOut;

    const aStr = str.split('.');
    const spliceRegex = /\((.*)\)/g;
    const replaceRegex = /\(|\)/g;
    let matchEase;
    let config;

    switch (aStr.length) {
        case 2:
            matchEase = gsap[aStr[0]][aStr[1]];
            break;
        case 3:
            config = aStr[2].match(spliceRegex).replace(replaceRegex, '').split(',');
            matchEase = gsap[aStr[0]][aStr[1]].config.apply(this, config);
            break;
        default:
            break;
    }
    return matchEase;
};

export { easeLookUp as default };
export { easeLookUp };
