/**
 * 批次清除標籤上的 style, 此方法會掠過 backgroundImage
 * @param  {...any} domArray nodeElement, 不同的項目用逗號分隔開來
 */
const clearStyleBatch = (...domArray) => {
    for (let i = 0; i < domArray.length; i += 1) {
        const dom = domArray[i];
        try {
            // const backgroundImage = dom.css('background-image')
            dom.attr('style', '');
            // if (backgroundImage) dom.css('background-image', backgroundImage)
        } catch (e) {
            // const { backgroundImage } = dom.style
            dom.setAttribute('style', '');
            // if (backgroundImage) dom.style.backgroundImage = backgroundImage
        }
    }
};

export { clearStyleBatch as default };
export { clearStyleBatch };
