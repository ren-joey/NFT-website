import { useEffect, useState } from 'react';
import moment from 'moment';
import { config } from 'src/config';
import 'src/components/FirstArea/Counter.scss';

const Counter = () => {
    const { now, getEnd } = config;
    const [counter, setCounter] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    const counterParser = (diff: number) => {
        const momentDuration = moment.duration(diff, 'milliseconds');
        const days = Math.floor(momentDuration.asDays());
        const hours = momentDuration.hours();
        const minutes = momentDuration.minutes();
        const seconds = momentDuration.seconds();
        setCounter({
            days: `0${days}`.slice(-2),
            hours: `0${hours}`.slice(-2),
            minutes: `0${minutes}`.slice(-2),
            seconds: `0${seconds}`.slice(-2)
        });
    };

    useEffect(() => {
        const end = getEnd();
        let diff = end.diff(now, 'milliseconds');
        counterParser(diff);

        let interval: undefined|NodeJS.Timer;
        if (diff > 0) {
            interval = setInterval(() => {
                diff -= 1000;
                counterParser(diff);

                if (diff <= 0) clearInterval(interval as NodeJS.Timer);
            }, 1000);
        }

        return () => {
            clearInterval(interval as NodeJS.Timer);
        };
    }, []);

    return (
        <div className="counter-area">
            <div className="row">
                <div className="col">
                    <div id="days" className="counter">
                        <div className="digit">{counter.days}</div>
                        <div className="digit-shadow">{counter.days}</div>
                        <div className="unit">days</div>
                    </div>
                </div>

                <div id="hours" className="col">
                    <div className="counter">
                        <div className="digit idx-2">{counter.hours}</div>
                        <div className="digit-shadow">{counter.hours}</div>
                        <div className="unit">hours</div>
                    </div>
                </div>

                <div id="minutes" className="col">
                    <div className="counter">
                        <div className="digit idx-3">{counter.minutes}</div>
                        <div className="digit-shadow">{counter.minutes}</div>
                        <div className="unit">minutes</div>
                    </div>
                </div>

                <div id="seconds" className="col">
                    <div className="counter font-a4-speed">
                        <div className="digit idx-4">{counter.seconds}</div>
                        <div className="digit-shadow">{counter.seconds}</div>
                        <div className="unit">seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;