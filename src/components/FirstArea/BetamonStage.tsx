import { getResources } from "src/functions/loader";

const BetamonStage = () => {
    const spotlightLeft: React.CSSProperties = { backgroundImage: `url(${getResources('spotlight_left')})` };

    return (
        <div className="b-alien-area">
            <div className="spotlight" style={spotlightLeft}></div>
            <div className="spotlight reverse" style={spotlightLeft}></div>
            <div className="ground" style={
                {backgroundImage: `url(${getResources('b_alien_ground')})`}
            }></div>
            <div className="b-alien-wave"></div>
            <div className="b-alien-line" style={
                { backgroundImage: `url(${getResources('b_alien')})` }
            }></div>
        </div>
    );
};

export default BetamonStage;