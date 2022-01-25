/**
 * 取得 dom 外高度
 * 包含 margin
 * @param {*} dom nodeElement
 */
const getOuterHeight = (dom) => {
    let elmHeight;
    let elmMargin;
    const elm = dom;
    if (document.all) { // IE
        elmHeight = elm.currentStyle.height;
        elmMargin = `${parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10)}px`;
    } else { // Mozilla
        elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
        elmMargin = `${parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'))}px`; // eslint-disable-line
    }
    return (+elmHeight.replace('px', '') + +elmMargin.replace('px', ''));
};

export { getOuterHeight as default };
export { getOuterHeight };
