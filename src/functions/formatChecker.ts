/* eslint-disable yoda */
/* eslint-disable no-useless-escape */
import moment from 'moment';
import { TrueOrString } from 'src/@types/basicVariable';

const required = (v: any): TrueOrString => v === 0 || !!v || 'FORM_ERROR_REQUIRED';
const ipRegex = (v: any): TrueOrString => new RegExp('((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.|$)){4}').test(v) || 'FORM_ERROR_IP_REGEX';
const hexColorCode = (v: any): TrueOrString => new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$').test(v) || 'FORM_ERROR_HEX_COLOR_CODE';
const number = (v: any): TrueOrString => new RegExp('^[0-9]+$').test(v) || 'FORM_ERROR_NUMBER';
const noNumber = (v: any): TrueOrString => new RegExp('^([^0-9]*)$').test(v) || 'FORM_ERROR_NO_NUMBER';
const int = (v: any): TrueOrString => +v < 2147483648 || 'FORM_ERROR_INT';
const nullable = (v: any): TrueOrString => !!v || v === null || 'FORM_ERROR_NULLABLE';
const boolean = (v: any): TrueOrString => v === true || v === false || 'FORM_ERROR_BOOLEAN';
const hourMinute = (v: any): TrueOrString => moment(v, 'HH:mm', true).isValid() || 'FORM_ERROR_TIME_FORMAT';
const fullDate = (v: any): TrueOrString => moment(v, 'YYYY-MM-DD HH:mm:ss', true).isValid() || 'FORM_ERROR_FULL_DATE';
const yearMonth = (v: any): TrueOrString => moment(v, 'YYYY-MM', true).isValid() || 'FORM_ERROR_YEAR_MONTH';
const yearMonthDay = (v: any): TrueOrString => moment(v, 'YYYY-MM-DD', true).isValid() || 'FORM_ERROR_YEAR_MONTH_DAY';
const image = (v: any): TrueOrString => new RegExp('[/.](gif|jpg|jpeg|tiff|png|svg)$').test(v) || 'FORM_ERROR_IMAGE';
const email = (v: any): TrueOrString => new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(v) || 'FORM_ERROR_EMAIL';
const phone = (v: any): TrueOrString => (new RegExp('^[0-9()\-]+$').test(v) && v.length >= 7) || 'FORM_ERROR_PHONE';

const formatChecker = {
    required,
    ipRegex,
    hexColorCode,
    number,
    noNumber,
    int,
    nullable,
    boolean,
    hourMinute,
    fullDate,
    yearMonth,
    yearMonthDay,
    image,
    email,
    phone
};

export default formatChecker;
