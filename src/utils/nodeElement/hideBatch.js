/**
 * 批次隱藏 nodeElement
 * @param  {...any} domArray nodeElement || str, 不同的項目用逗號分隔開來
 */
const hideBatch = (...domArray) => {
    for (let i = 0; i < domArray.length; i += 1) {
        if (!domArray[i]) return;
        if (String(typeof domArray[i]) === 'string') {
            try {
                document.querySelector(domArray[i]).hide();
            } catch (e) {
                const dom = document.querySelector(domArray[i]);
                dom.style.display = 'none';
            }
        } else {
            try {
                domArray[i].hide();
            } catch (e) {
                const dom = domArray[i];
                dom.style.display = 'none';
            }
        }
    }
};

export { hideBatch as default };
export { hideBatch };
