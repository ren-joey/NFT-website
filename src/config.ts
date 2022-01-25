import moment from 'moment';

interface IConfig {
    readonly counterTimes: moment.Moment[],
    readonly now: moment.Moment,
    end: undefined|moment.Moment,
    readonly getEnd: () => moment.Moment
}

const zone = '+0800';

export const config: IConfig  = {
    counterTimes: [
        moment('2022/3/22 15:00').zone(zone),
        moment('2022/3/23 15:00').zone(zone),
        moment('2022/4/6 15:00').zone(zone),
        moment('2022/6/1 15:00').zone(zone)
    ],
    now: moment().zone(zone),
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

