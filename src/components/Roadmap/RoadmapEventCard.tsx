import { useContext } from 'react';
import { LangContext } from 'src/Context/LangContext';
import 'src/components/Roadmap/RoadmapCard.scss';
import { getResources } from 'src/functions/loader';
import { EventContext } from 'src/Context/EventContext';
import { socialList } from 'src/configs/socialMediaConfig';
import hrefTo from 'src/functions/hrefTo';

interface Props {
    idx: number,
    className?: string
}

const RoadmapEventCard = ({ idx, className = '' }: Props) => {
    const lang = useContext(LangContext);
    const { selectedLang } = useContext(EventContext);
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
        if (device === 'phone') return;

        return (
            <div className="social-links">
                <div className="social-link-area">
                    <div
                        className="social-link-btn"
                        onClick={() => hrefTo(socialList[5])}
                        style={{backgroundImage: `url(${getResources('eth_icon_2')})`}}
                    >
                    </div>
                    <div className={`social-text-bubble ${socialList[5].title}-1`}>
                        {lang.PROMOTION_1}
                    </div>
                </div>
                <div className="social-link-area">
                    <div
                        className="social-link-btn"
                        onClick={() => hrefTo(socialList[6])}
                        style={{backgroundImage: `url(${getResources('eth_icon_3')})`}}
                    >
                    </div>
                    <div className={`social-text-bubble ${socialList[6].title}-2`}>
                        {lang.PROMOTION_2}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="roadmap-card-row">
            <div className="roadmap-time">
                <div className={`pre-line time ${className}`}>
                    { lang[`ROADMAP_CARD_${idx}_DATE`] }
                </div>
            </div>
            <div className="roadmap-main">
                <div className="roadmap-card">
                    <div className="card-top">
                        <div className={`title pre-line ${selectedLang}`}>
                            { lang[`ROADMAP_CARD_${idx}_TITLE`] }
                        </div>
                        <div className={`subtitle pre-line ${selectedLang}`}>
                            { lang[`ROADMAP_CARD_${idx}_SUBTITLE`] }
                        </div>
                        <div
                            className="star"
                            style={
                                { backgroundImage: `url(${getResources('star_icon')})` }
                            }
                        >
                        </div>
                    </div>
                    <div className={`card-bottom ${device === 'desktop' ? 'social-card' : ''}`}>
                        <div className={`remark pre-line ${selectedLang}`}>
                            { lang[`ROADMAP_CARD_${idx}_REMARK`] }
                        </div>
                        {
                            device === 'desktop' && (
                                <div
                                    className="blue-arrow"
                                    style={
                                        { backgroundImage: `url(${getResources('blue_arrow')})` }
                                    }
                                >
                                </div>
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

export default RoadmapEventCard;

