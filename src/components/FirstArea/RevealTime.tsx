/* cSpell:words UTCZ */

import { useContext, useMemo } from "react";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import CountingHandler from "src/CountingHandler";

const RevealTime = () => {
    const { end } = useContext(EventContext);
    const lang = useContext(LangContext);
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
                        { lang.STAY_TURNED }
                    </div>
                )
            }
        </div>
    );
};

export default RevealTime;