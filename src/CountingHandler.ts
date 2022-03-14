import moment from 'moment';
import ZH_CN from './lang/ZH_CN';

const timeFormat = 'YYYY/MM/DD HH:mm:ss Z';
const timeOffset = '+08:00';

const timeParser = (time: string) => `${time} ${timeOffset}`;
const getMoment = (time: string) => moment(timeParser(time), timeFormat);

// const regex = new RegExp(/(?<![1-9]+)0/g);
// const date1 = ZH_CN.ROADMAP_CARD_2_DATE.replace(regex, '');
// const date2 = ZH_CN.ROADMAP_CARD_3_DATE.replace(regex, '');
// const date3 = ZH_CN.ROADMAP_CARD_4_DATE.replace(regex, '');

// [DEV]
// const date1 = ZH_CN.ROADMAP_CARD_2_DATE;
// const date2 = ZH_CN.ROADMAP_CARD_3_DATE;
// const date3 = ZH_CN.ROADMAP_CARD_4_DATE;

class CountingHandler {
    now: undefined|moment.Moment;
    counterTimes: moment.Moment[];
    status: number;
    diff: number;

    constructor() {
        this.counterTimes = [
            // getMoment(`2022/${date1} 15:00`),
            // getMoment(`2022/${date2} 15:00`),
            // getMoment(`2022/${date3} 15:00`)
            getMoment(`2022/03/14 11:00`), // VIP
            getMoment(`2022/03/14 12:00`), // 搗蛋
            getMoment(`2022/03/14 14:00`), // 全面
            getMoment(`2022/03/14 16:00`) // 解盲
        ];
        this.status = -1;
        this.diff = -1;
        this.initialize();

        setInterval(() => {
            this.count();
        }, 1000);
    }

    initialize() {
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