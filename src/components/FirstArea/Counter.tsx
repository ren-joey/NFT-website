import { useContext, useEffect } from 'react';
import 'src/components/FirstArea/Counter.scss';
import { EventContext } from 'src/Context/EventContext';
import CountingHandler from 'src/CountingHandler';

const Counter = () => {
    const {
        counter,
        setCounter,
        status,
        setStatus,
        setEnd,
        setDiff
    } = useContext(EventContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDiff(CountingHandler.diff);
            setCounter(CountingHandler.getDateTime());
            if (CountingHandler.status !== status) {
                setStatus(CountingHandler.status);
                setEnd(CountingHandler.getEnd());
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

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