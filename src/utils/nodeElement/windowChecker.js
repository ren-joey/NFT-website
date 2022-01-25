/**
 * 螢幕寬度度量器
 * 'xl' || 'lg' || 'md' || 'sm'
 * @returns {String} 當前寬度區間
 */
const windowChecker = () => {
    const { innerWidth } = window;
    let device;
    if (innerWidth > 1440) {
        device = 'xl';
    } else if (innerWidth > 1200 && innerWidth <= 1440) {
        device = 'lg';
    } else if (innerWidth > 1024 && innerWidth <= 1200) {
        device = 'md';
    } else if (innerWidth <= 1024) {
        device = 'sm';
    }

    return device;
};

export { windowChecker as default };
export { windowChecker };
