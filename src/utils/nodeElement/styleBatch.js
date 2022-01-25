/**
 * 批次樣式修改器
 * @param {String} doms 目標 dom，以陣列或字串傳送
 * @param {Object} style 欲改變的 style
 */
const styleBatch = (doms, style) => {
    const stylePaster = (dom) => {
        Object.keys(style).forEach((key) => {
            dom.style[key] = style[key]; // eslint-disable-line
        });
    };

    if (String(typeof dom) === 'string') {
        const dom = document.querySelector(doms);
        stylePaster(dom);
    }
    if (Array.isArray(doms)) {
        for (let i = 0; i < doms.length; i += 1) {
            const dom = doms[i];
            if (String(typeof dom) === 'string') dom = document.querySelector(dom); // eslint-disable-line
            stylePaster(dom);
        }
    }
};

export { styleBatch as default };
export { styleBatch };
