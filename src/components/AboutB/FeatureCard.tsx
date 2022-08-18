import React, { useMemo } from 'react';
import { LangContext } from 'src/Context/LangContext';
import 'src/components/AboutB/FeatureCard.scss';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';
import gaParser from 'src/functions/gaParser';
import { LangString } from 'src/@types/basicVariable';
interface Props {
    idx: number,
    line?: boolean,
    selectedLang: LangString
}

const FeatureCard = ({ idx, line = true, selectedLang }: Props) => {
    const lang = React.useContext(LangContext);
    const { device } = React.useContext(EventContext);
    const iconUrl = getResources(`feature_icon_${idx}`);

    const [title, desc] = useMemo(() => {
        let title, desc;
        if (device === 'desktop') {
            title =  lang[`ABOUT_B_CARD_${idx}_TITLE_PC`] || lang[`ABOUT_B_CARD_${idx}_TITLE`];
            desc = lang[`ABOUT_B_CARD_${idx}_DESC_PC`] || lang[`ABOUT_B_CARD_${idx}_DESC`];
        } else {
            title = lang[`ABOUT_B_CARD_${idx}_TITLE`];
            desc = lang[`ABOUT_B_CARD_${idx}_DESC`];
        }

        return [title, desc];
    }, [device, lang, idx]);

    const btn = () => {
        const btn = lang[`ABOUT_B_CARD_${idx}_BTN`];
        if (!btn) return;

        const href = lang[`ABOUT_B_CARD_${idx}_HREF`];
        const action = () => {
            gaParser('主站', '質押錢包', '0303版網站');

            if (href) window.open(href, '_blank');
            else alert(lang.RECENTLY_ANNOUNCED);
        };
        return (
            <div
                className="feature-btn"
                onClick={action}
            >
                {btn}
            </div>
        );
    };

    return (
        <div className="feature-card">
            <div
                className="feature-card-icon"
                style={
                    { backgroundImage: `url(${iconUrl})` }
                }
            >
            </div>
            <div
                className={`card-body ${selectedLang}`}
                style={
                    { backgroundImage: `url(${getResources('bg')})` }
                }
            >
                <div
                    className={`title ${selectedLang}`}
                    dangerouslySetInnerHTML={{__html: title}}
                >
                </div>
                <div
                    className={`desc pre-line ${selectedLang}`}
                    dangerouslySetInnerHTML={{__html: desc}}
                >
                </div>
                { btn() }
            </div>

            {
                (line && device === 'desktop') && <div className="right-line"></div>
            }

            {/* <div className="backdrop"></div> */}
        </div>
    );
};

export default FeatureCard;