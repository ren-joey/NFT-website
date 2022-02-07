import React, { useMemo } from "react";
import { LangContext } from "src/Context/LangContext";
import 'src/components/AboutB/FeatureCard.scss';
import { RwdContext } from "src/Context/RwdContext";
import { LangString } from "src/lang";
import { getResources } from "src/functions/loader";
interface Props {
    idx: number,
    line?: boolean,
    selectedLang: LangString
}

const FeatureCard = ({ idx, line = true, selectedLang }: Props) => {
    const lang = React.useContext(LangContext);
    const { device } = React.useContext(RwdContext);
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

    return (
        <div className="feature-card">
            <div className="feature-card-icon" style={
                { backgroundImage: `url(${iconUrl})` }
            }></div>
            <div className="card-body" style={
                { backgroundImage: `url(${getResources('bg')})` }
            }>
                <div
                    className={`title ${selectedLang === 'EN' ? 'force-wrap' : ''}`}
                    dangerouslySetInnerHTML={{__html: title}}
                ></div>
                <div
                    className="desc"
                    dangerouslySetInnerHTML={{__html: desc}}
                ></div>
            </div>

            {
                line && device === 'desktop'
                    ? <div className="right-line"></div>
                    : ''
            }

            {/* <div className="backdrop"></div> */}
        </div>
    );
};

export default FeatureCard;