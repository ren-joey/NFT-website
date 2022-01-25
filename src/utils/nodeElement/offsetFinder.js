/**
 * javascript element 定位搜尋器
 * @param {Object} dom javascript element
 * @returns {Object} {top: {number}, left: {number}}
 * @example
 *   return { top: 100, left: 100}
 */
const offsetFinder = (dom, parent) => {
    const rect = dom.getBoundingClientRect();
    const doc = (parent) ? parent.scrollTop : (document.scrollingElement) ? document.scrollingElement : document.documentElement; // eslint-disable-line
    // QA-7 IE,UC瀏覽器支援性修正
    const scrollTop = doc.scrollTop || window.pageYOffset;
    const scrollLeft = doc.scrollLeft || window.pageYOffset;

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

export { offsetFinder as default };
export { offsetFinder };
