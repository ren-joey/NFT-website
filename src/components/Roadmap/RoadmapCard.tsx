import React from "react";
import { LangContext } from "src/Context/LangContext";
import 'src/components/Roadmap/RoadmapCard.scss';
import { getResources } from "src/functions/loader";
import gaParser from "src/functions/gaParser";

interface Props {
    idx: number
}

const RoadmapCard = ({ idx }: Props) => {
    const lang = React.useContext(LangContext);

    const btn = () => {
        const btn = lang[`ROADMAP_CARD_${idx}_BTN`];
        if (!btn) return;

        const label = lang[`ROADMAP_CARD_${idx}_BTN_LABEL`];
        const href = lang[`ROADMAP_CARD_${idx}_HREF`];
        const action = () => {
            gaParser('主站', '土地', '0303版網站');

            if (href) window.open(href, '_blank');
            else alert(lang.RECENTLY_ANNOUNCED);
        };
        return btn && (
            <div
                className="roadmap-btn-wrap"
                style={
                    { backgroundImage: `url(${getResources('card_btn_bg')})` }
                }
                onClick={action}
            >
                <div className="roadmap-btn">
                    <div className="label">
                        {label}
                    </div>
                    <div className="title">
                        {btn}
                    </div>
                </div>
            </div>
        );
    };

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
                        <div className="star" style={
                            { backgroundImage: `url(${getResources('star_icon')})` }
                        }></div>
                    </div>
                    <div className="card-bottom">
                        <div className="remark" dangerouslySetInnerHTML={{__html: lang[`ROADMAP_CARD_${idx}_REMARK`]}}></div>
                    </div>

                    { btn() }
                </div>
            </div>
        </div>
    );
};

export default RoadmapCard;

