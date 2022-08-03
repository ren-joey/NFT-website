import { debounce } from 'lodash';

class ResizeListener {
    methodList: (() => any)[];
    resizeHandler: () => void;

    constructor(debounceRate = 100) {
        this.methodList = [];
        this.resizeHandler = debounce(() => {
            for (let i = 0; i < this.methodList.length; i++) {
                this.methodList[i]();
            }
        }, 100);

        window.addEventListener('resize', this.resizeHandler);
    }

    add(fn: () => any) {
        this.methodList.push(fn);
    }

    erase() {
        this.methodList = [];
        window.removeEventListener('resize', this.resizeHandler);
    }
}

export default new ResizeListener();