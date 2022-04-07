/**
 * 批次隱藏 nodeElement
 * @param domArray - 要隱藏的 dom 對象，可傳入 querySelector
 */
const hideBatch = (...domArray: (HTMLElement|string)[]): void => {
    for (let i = 0; i < domArray.length; i += 1) {
        if (!domArray[i]) return;
        const dom = String(typeof domArray[i]) === 'string'
            ? <HTMLElement>document.querySelector(<string>domArray[i])
            : <HTMLElement>domArray[i];
        dom.style.display = 'none';
    }
};

hideBatch();

export { hideBatch as default };
export { hideBatch };
