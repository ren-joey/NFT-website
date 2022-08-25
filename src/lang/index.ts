import EN from './EN';
import ZH_CN from './ZH_CN';
import ZH_TW from './ZH_TW';

export interface Lang {
    readonly [index: string]: string;
}

const allLang = {
    EN,
    ZH_CN,
    ZH_TW
};

export default allLang;
export {
    EN,
    ZH_CN,
    ZH_TW
};