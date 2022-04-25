import { useContext, useEffect } from "react";
import { NullableBigNumber } from "src/@types/basicVariable";
import { defaultEventContext, EventContext } from "src/Context/EventContext";
import CountingHandler from "src/CountingHandler";
import Counter from "../Counter";
import RevealTime from "../RevealTime";

const TimeArea = ({ remain }: { remain: NullableBigNumber }) => {
    const {
        status,
        setDiff,
        setCounter,
        setStatus,
        setEnd
    } = useContext(EventContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDiff(CountingHandler.diff);
            if (CountingHandler.diff <= 0) {
                setCounter(defaultEventContext.counter);
            } else {
                setCounter(CountingHandler.getDateTime());
            }
            setStatus(CountingHandler.status);
            setEnd(CountingHandler.getEnd());
        }, 1000);

        return () => clearTimeout(timer);
    });

    switch(status) {
        case -1:
        case 3:
            return (
                <>
                    <RevealTime />
                    <Counter />
                </>
            );
        case 2:
            return (remain?.isZero()) ? (
                <>
                    <RevealTime />
                    <Counter />
                </>
            ) : <></>;
        case 0:
        case 1:
        default:
            return <></>;
    }
};

export default TimeArea;