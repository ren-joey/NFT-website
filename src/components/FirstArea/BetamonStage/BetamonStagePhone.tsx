import { getResources } from "src/functions/loader";

const BetamonStagePhone = () => {
    const spotlightLeft: React.CSSProperties = { backgroundImage: `url(${getResources('spotlight_left')})` };

    return (
        <div className="b-alien-area-sm">
            <div className="b-alien-wave">
                <div className="b-alien-stroke" style={
                    { backgroundImage: `url(${getResources('b_alien')})` }
                }></div>
                <div className="spotlight" style={spotlightLeft}></div>
                <div className="spotlight reverse" style={spotlightLeft}></div>
            </div>
        </div>
    );
};

export default BetamonStagePhone;