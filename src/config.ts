import moment from 'moment';

interface IConfig {
    readonly counterTimes: moment.Moment[],
    readonly now: moment.Moment,
    end: undefined|moment.Moment,
    readonly getEnd: () => moment.Moment
}

const timeFormat = 'YYYY/MM/DD HH:mm:ss Z';
const timeOffset = '+08:00';

const timeParser = (time: string) => `${time} ${timeOffset}`;
const getMoment = (time: string) => moment(timeParser(time), timeFormat);

export const config: IConfig  = {
    counterTimes: [
        getMoment('2022/3/22 15:00'),
        getMoment('2022/3/23 15:00'),
        getMoment('2022/4/6 15:00'),
        getMoment('2022/6/1 15:00')
    ],
    now: moment(),
    end: undefined,
    getEnd: () => {
        if (config.end !== undefined) return config.end;
        for (let i = 0; i < config.counterTimes.length; i += 1) {
            const end = config.counterTimes[i];
            const diff = end.diff(config.now, 'milliseconds');
            if (diff > 0) {
                config.end = end;
                return end;
            }
        }
        config.end = config.now;
        return config.end;
    }
};

