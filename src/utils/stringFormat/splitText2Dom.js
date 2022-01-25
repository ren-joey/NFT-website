/* eslint-disable no-param-reassign */

/**
 * 文字拆解器
 * @param {object} target jQuery dom，其內不可有標籤，只能放文字
 * @param {Array} [aIndex]
 *  選填，指定要加入特殊樣式的文字 index 及 style，每組用 json 包裝，組成一個陣列
 *  [ { index: [3, 4, 5, 6], style: '...' } ]
 * @param {Array} [aWrap] 要換行的 index 字數
 * @returns {Array} 返回拆解的 jQuery dom 字符
 */

const splitText2Dom = (target, aIndex, aWrap = []) => {
    let targetText = target.innerHTML;

    const replaceText = (str) => {
        aWrap.push(str.indexOf('<br>'));
        const string = str.replace('<br>', '');
        if (string.indexOf('<br>') !== -1) replaceText(string);
        else {
            targetText = string;
        }
    };

    if (targetText.indexOf('<br>') !== -1) {
        replaceText(targetText);
    }

    const aText = targetText.split('');
    target.innerHTML = '';
    const aTextDom = aText.map((char) => {
        if (char === ' ') char = '&nbsp;';
        const dom = document.createElement('div');
        dom.setAttribute('style', 'display: inline-block');
        dom.innerHTML = char;
        target.appendChild(dom);
        return dom;
    });

    if (aIndex && aIndex.constructor.name === 'Array') {
    // if (aIndex && aIndex.length > 0) {
        aIndex.forEach((jStyle) => {
            jStyle.index.forEach((index) => {
                if (typeof index === 'number') aTextDom[index].setAttribute('style', `display: inline-block; ${jStyle.style}`);
                else if (typeof index === 'string') {
                    const aIdx = index.split('-');
                    for (let i = +aIdx[0]; i <= +aIdx[1]; i += 1) aIdx.push(i);
                    aIdx.forEach((idx) => {
                        aTextDom[idx].setAttribute('style', `display: inline-block; ${jStyle.style}`);
                    });
                }
            });
        });
    }

    if (aWrap.length !== 0) {
        for (let i = aWrap.length - 1; i >= 0; i -= 1) {
            const br = document.createElement('br');
            target.insertBefore(br, aTextDom[aWrap[i]]);
        }
    }

    return aTextDom;
};

const splitText2DomWithoutSpace = (target, aIndex, aWrap = []) => {
    let targetText = target.innerHTML;

    const replaceText = (str) => {
        aWrap.push(str.indexOf('<br>'));
        const string = str.replace('<br>', '');
        if (string.indexOf('<br>') !== -1) replaceText(string);
        else {
            targetText = string;
        }
    };

    if (targetText.indexOf('<br>') !== -1) {
        replaceText(targetText);
    }

    const aText = targetText.replace(/ /g, '').split('');
    target.innerHTML = '';
    const aTextDom = aText.map((char) => {
        if (char === ' ') char = '&nbsp;';
        const dom = document.createElement('div');
        dom.setAttribute('style', 'display: inline-block');
        dom.innerHTML = char;
        target.appendChild(dom);
        return dom;
    });

    if (aIndex && aIndex.constructor.name === 'Array') {
    // if (aIndex && aIndex.length > 0) {
        aIndex.forEach((jStyle) => {
            jStyle.index.forEach((index) => {
                if (typeof index === 'number') aTextDom[index].setAttribute('style', `display: inline-block; ${jStyle.style}`);
                else if (typeof index === 'string') {
                    const aIdx = index.split('-');
                    for (let i = +aIdx[0]; i <= +aIdx[1]; i += 1) aIdx.push(i);
                    aIdx.forEach((idx) => {
                        aTextDom[idx].setAttribute('style', `display: inline-block; ${jStyle.style}`);
                    });
                }
            });
        });
    }

    if (aWrap.length !== 0) {
        for (let i = aWrap.length - 1; i >= 0; i -= 1) {
            const br = document.createElement('br');
            target.insertBefore(br, aTextDom[aWrap[i]]);
        }
    }

    return aTextDom;
};


export { splitText2Dom as default };
export { splitText2Dom, splitText2DomWithoutSpace };
