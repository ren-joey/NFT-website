/**
 * javascript scroll mover
 * @param {Object} el HTML scroll dom
 * @param {Number} to offsetTop where want to go
 * @param {Number} duration animate time
 * @example
 *   scrollMover(el, offsetTop, duration);
 */

// t = current time
// b = start value
// c = change in value
// d = duration
function easeInOutQuad(currentTime, startVal, changeVal, duration) {
    let time = currentTime;
    time /= duration / 2;
    if (time < 1) return (changeVal / 2) * time * time + startVal;
    time -= 1;
    return (-changeVal / 2) * (time * (time - 2) - 1) + startVal;
}
function scrollTo(el, to, duration) {
    const start = el.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;
    const element = el;
    function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }
    animateScroll();
}

const scrollMover = (el, to, duration) => {
    // el 需具有 scrollTop 屬性
    scrollTo(el, to, duration);
};

export { scrollMover as default };
export { scrollMover };
