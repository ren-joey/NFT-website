import { useContext } from "react";
import { NullableBigNumber } from "src/@types/basicVariable";
import { EventContext } from "src/Context/EventContext";
import Counter from "../Counter";
import RevealTime from "../RevealTime";

const TimeArea = ({ remain }: { remain: NullableBigNumber }) => {
    const { status } = useContext(EventContext);

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