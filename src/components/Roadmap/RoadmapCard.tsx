import React from "react";
import { LangContext } from "src/Context/LangContext";
import 'src/components/Roadmap/RoadmapCard.scss'

interface Props {
    idx: number
}

const RoadmapCard = ({ idx }: Props) => {
    const lang = React.useContext(LangContext);

    return (
        <div className="roadmap-card-row">
            <div className="roadmap-time">
                <div className="time" dangerouslySetInnerHTML={{__html: lang[`ROADMAP_CARD_${idx}_DATE`]}}></div>
            </div>
            <div className="roadmap-main">
                <div className="roadmap-card">
                    <div className="card-top">
                        <div className="title"
                            dangerouslySetInnerHTML={{__html: lang[`ROADMAP_CARD_${idx}_TITLE`]}}
                        ></div>
                        <div className="subtitle"
                            dangerouslySetInnerHTML={
                                {__html: lang[`ROADMAP_CARD_${idx}_SUBTITLE`]}
                            }
                        ></div>
                        <div className="star"></div>
                    </div>
                    <div className="card-bottom">
                        <div className="remark" dangerouslySetInnerHTML={{__html: lang[`ROADMAP_CARD_${idx}_REMARK`]}}></div>
                    </div>
                    <div className="backdrop"></div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapCard;

