/* eslint-disable yoda */
/* eslint-disable no-useless-escape */
import moment from 'moment';
import { TrueOrString } from 'src/@types/basicVariable';

const required = (v: any): TrueOrString => v === 0 || !!v || '請完整填寫表單';
const ipRegex = (v: any): TrueOrString => new RegExp('((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.|$)){4}').test(v) || 'IP 不合法，請重新確認';
const hexColorCode = (v: any): TrueOrString => new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$').test(v) || '請使用 HEX 色碼';
const number = (v: any): TrueOrString => new RegExp('^[0-9]+$').test(v) || '排序只能為數字';
const int = (v: any): TrueOrString => +v < 2147483648 || '數字超出上限';
const nullable = (v: any): TrueOrString => !!v || v === null || '此欄位若為空值請填入 null';
const boolean = (v: any): TrueOrString => v === true || v === false || '此欄位只可填入布林值';
const hourMinute = (v: any): TrueOrString => moment(v, 'HH:mm', true).isValid() || '請輸入正確時間格式';
const fullDate = (v: any): TrueOrString => moment(v, 'YYYY-MM-DD HH:mm:ss', true).isValid() || '請輸入正確日期格式';
const yearMonth = (v: any): TrueOrString => moment(v, 'YYYY-MM', true).isValid() || '此欄位僅包含年及月';
const yearMonthDay = (v: any): TrueOrString => moment(v, 'YYYY-MM-DD', true).isValid() || '此欄位僅包含年月日';
const image = (v: any): TrueOrString => new RegExp('[/.](gif|jpg|jpeg|tiff|png|svg)$').test(v) || '檔案格式必須為圖片格式';
const email = (v: any): TrueOrString => new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(v) || '請輸入正確信箱格式';

const formatChecker = {
    required,
    ipRegex,
    hexColorCode,
    number,
    int,
    nullable,
    boolean,
    hourMinute,
    fullDate,
    yearMonth,
    yearMonthDay,
    image,
    email
};

export default formatChecker;
