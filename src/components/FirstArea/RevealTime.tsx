/* cSpell:words UTCZ */

import { useContext, useMemo } from "react";
import { EventContext } from "src/Context/EventContext";
import CountingHandler from "src/CountingHandler";

const RevealTime = () => {
    const { end } = useContext(EventContext);
    const diff = useMemo(() => end.diff(CountingHandler.now), [end]);

    return (
        <div className="reveal-time-area">
            {
                diff > 0 ? (
                    <div className="reveal-time">
                        { end.format('MMMM D YYYY HH:mm:ss UTCZ') }
                    </div>
                ) : (
                    <div className="reveal-time">
                        敬請期待
                    </div>
                )
            }
        </div>
    );
};

export default RevealTime;