import { useContext, useEffect } from 'react';
import { defaultEventContext, EventContext } from 'src/Context/EventContext';
import CountingHandler from 'src/functions/CountingHandler';

const useCounter = () => {
    const {
        setDiff,
        setCounter,
        setStatus,
        setEnd
    } = useContext(EventContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setDiff(CountingHandler.diff);
            if (CountingHandler.diff <= 0) {
                setCounter(defaultEventContext.counter);
            } else {
                setCounter(CountingHandler.getDateTime());
            }
            setStatus(CountingHandler.status);
            setEnd(CountingHandler.getEnd());
        }, 1000);

        return () => clearInterval(interval);
    });
};

export default useCounter;