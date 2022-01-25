import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { config } from 'src/config';
import 'src/components/FirstArea/Counter.scss';

const Counter = () => {
    const { now, getEnd } = config;
    const [duration, setDuration] = useState(0);
    const momentDuration = useMemo(() => moment.duration(duration, 'milliseconds'), [duration]);
    const days = useMemo(() => `0${Math.floor(momentDuration.asDays())}`.slice(-2), [duration]);
    const hours = useMemo(() => `0${momentDuration.hours()}`.slice(-2), [duration]);
    const minutes = useMemo(() => `0${momentDuration.minutes()}`.slice(-2), [duration]);
    const seconds = useMemo(() => `0${momentDuration.seconds()}`.slice(-2), [duration]);

    useEffect(() => {
        const end = getEnd();
        const diff = end.diff(now, 'milliseconds');
        setDuration(diff);
    }, []);

    useEffect(() => {
        if (duration !== 0) {
            setTimeout(() => {
                setDuration(duration - 1000);
            }, 1000);
        }
    }, [duration]);

    return (
        <div className="counter-area">
            <div className="row">
                <div className="col">
                    <div id="days" className="counter">
                        <div className="digit">{days}</div>
                        <div className="digit-shadow">{days}</div>
                        <div className="unit">days</div>
                    </div>
                </div>

                <div id="hours" className="col">
                    <div className="counter">
                        <div className="digit idx-2">{hours}</div>
                        <div className="digit-shadow">{hours}</div>
                        <div className="unit">hours</div>
                    </div>
                </div>

                <div id="minutes" className="col">
                    <div className="counter">
                        <div className="digit idx-3">{minutes}</div>
                        <div className="digit-shadow">{minutes}</div>
                        <div className="unit">minutes</div>
                    </div>
                </div>

                <div id="seconds" className="col">
                    <div className="counter font-a4-speed">
                        <div className="digit idx-4">{seconds}</div>
                        <div className="digit-shadow">{seconds}</div>
                        <div className="unit">seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;