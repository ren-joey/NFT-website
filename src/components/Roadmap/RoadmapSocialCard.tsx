import React, { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import 'src/components/Roadmap/RoadmapCard.scss';
import { getResources } from "src/functions/loader";
import { EventContext } from "src/Context/EventContext";
import { socialList } from "src/socialMediaConfig";
import hrefTo from "src/functions/hrefTo";

interface Props {
    idx: number
}

const RoadmapSocialCard = ({ idx }: Props) => {
    const lang = React.useContext(LangContext);
    const { device } = useContext(EventContext);

    const btn = () => {
        const btn = lang[`ROADMAP_CARD_${idx}_BTN`];
        if (!btn) return;

        const label = lang[`ROADMAP_CARD_${idx}_BTN_LABEL`];
        const href = lang[`ROADMAP_CARD_${idx}_HREF`];
        const action = href
            ? () => window.open(href, '_blank')
            : () => alert(lang.RECENTLY_ANNOUNCED);
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

    const socialLinks = () => {
        if (idx !== 1 || device === 'phone') return;

        return (
            <div className="social-links">
                {
                    socialList.map((social, idx) => {
                        if (!social.visible) return false;
                        const iconUrl = getResources(`${social.iconName}_icon_gradient`);
                        return <div className="social-link-area" key={idx}>
                            <div
                                className="social-link-btn"
                                onClick={() => hrefTo(social)}
                                style={{backgroundImage: `url(${iconUrl})`}}></div>
                            <div className={`social-text-bubble ${social.iconName}`}>
                                {social.iconName}
                            </div>
                        </div>;
                    })
                }
            </div>
        );
    };

    return (
        <div className="roadmap-card-row">
            <div className="roadmap-time">
                <div
                    className="time"
                    dangerouslySetInnerHTML={{__html: lang[`ROADMAP_CARD_${idx}_DATE`]}}
                ></div>
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
                    <div className={`card-bottom ${device === 'desktop' ? 'social-card' : ''}`}>
                        <div className="remark">
                            { lang[`ROADMAP_CARD_${idx}_REMARK`] }
                        </div>
                        {
                            device === 'desktop' && (
                                <div className="blue-arrow" style={
                                    { backgroundImage: `url(${getResources('blue_arrow')})` }
                                }></div>
                            )
                        }

                        { socialLinks() }
                    </div>

                    { btn() }
                </div>
            </div>
        </div>
    );
};

export default RoadmapSocialCard;

