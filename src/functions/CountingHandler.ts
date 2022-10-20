import moment from 'moment';
import { getParameterByName } from '../utils';

const timeFormat = 'YYYY/MM/DD HH:mm:ss Z';
const timeOffset = '+08:00';

const timeParser = (time: string) => `${time} ${timeOffset}`;
const getMoment = (time: string) => moment(timeParser(time), timeFormat);

class CountingHandler {
    now: undefined|moment.Moment;
    counterTimes: moment.Moment[];
    status: number;
    diff: number;

    constructor() {
        this.counterTimes = [
            getMoment('2022/04/29 15:00'), // VIP [DEV]
            getMoment('2022/04/29 15:00'), // 搗蛋
            getMoment('2022/05/04 16:30'), // 全面
            getMoment('2022/05/04 16:33'), // 解盲
            getMoment('2022/06/17 13:45'), // 兌換活動
            getMoment('2022/10/19 00:00') // 黑暗 betamon 預告期

            // getMoment(`2022/03/31 15:00`), // VIP
            // getMoment(`2022/04/26 15:00`), // 搗蛋
            // getMoment(`2022/04/27 15:00`), // 全面
            // getMoment(`2022/05/12 15:00`), // 解盲
            // getMoment(`2022/06/22 15:00`), // 兌換活動
            // getMoment('2022/11/1 00:00') // 黑暗 betamon 預告期
        ];

        /**
         * 測試用的時間設定到陣列中
         * 如 ?setTime=0&time=2022/06/01 15:00 +08:00
         * [DEV]
         */
        const setTime = getParameterByName('setTime');
        if(setTime) {
            const time = getParameterByName('time');
            if (time) {
                const dt = getMoment(time);
                if (dt.isValid()) {
                    for (let i = 0; i <= Number(setTime); i++) {
                        this.counterTimes[i] = dt;
                    }
                }
            }
        }
        this.status = -1;
        this.diff = -1;
        this.initialize();

        setInterval(() => {
            this.count();
        }, 1000);
    }

    initialize() {
        // const getDateTime = async () => {
        //     const res: any = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Taipei');
        //     let now = moment(res?.datetime);
        //     if (!now.isValid()) now = moment();
        //     return now;
        // };
        this.now = moment();

        for (let i = 0; i < this.counterTimes.length; i += 1) {
            const end = this.counterTimes[i];
            const diff = end.diff(this.now, 'milliseconds');
            if (diff > 0) {
                this.status = i - 1;
                this.diff = diff;
                return;
            }
        }
        this.status = this.counterTimes.length - 1;
    }

    count() {
        if (this.diff <= 0) this.initialize();
        else {
            this.diff -= 1000;
            if (this.diff < 0) this.diff = 0;
        }
    }

    getDateTime() {
        const momentDuration = moment.duration(this.diff, 'milliseconds');
        const days = Math.floor(momentDuration.asDays());
        const hours = momentDuration.hours();
        const minutes = momentDuration.minutes();
        const seconds = momentDuration.seconds();

        return {
            days: `0${days}`.slice(-2),
            hours: `0${hours}`.slice(-2),
            minutes: `0${minutes}`.slice(-2),
            seconds: `0${seconds}`.slice(-2)
        };
    }

    getEnd() {
        const len = this.counterTimes.length;
        if (this.status + 1 >= len) {
            return this.counterTimes[len - 1];
        }

        return this.counterTimes[this.status + 1];
    }
}

export default new CountingHandler();