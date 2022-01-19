import React from "react";
import { langContext } from "src/Context/LangContext";
import 'src/components/AboutB/FeatureCard.scss'

interface Props {
    idx: number
}

const FeatureCard = ({ idx }: Props) => {
    const lang = React.useContext(langContext);
    return (
        <div className="feature-card">
            <div className={`feature-card-icon idx-${idx}`}></div>
            <div className="card-body">
                <div className="title" dangerouslySetInnerHTML={{__html: lang[`ABOUT_B_CARD_${idx}_TITLE`]}}></div>
                <div className="desc" dangerouslySetInnerHTML={{__html: lang[`ABOUT_B_CARD_${idx}_DESC`]}}></div>
            </div>
        </div>
    );
}

export default FeatureCard;