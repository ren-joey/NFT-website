/**
 * 批次刪除 nodeElement
 * @param  {...any} domArray nodeElement, 不同的項目用逗號分隔開來
 */
const removeBatch = (...domArray) => {
    domArray.forEach((dom) => {
        if (!dom) return;
        try {
            dom.remove();
        } catch (e) {
            if (dom.parenNode) dom.parenNode.removeChild(dom);
        }
    });
};

export { removeBatch as default };
export { removeBatch };
