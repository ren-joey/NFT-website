import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";
import hrefTo from "src/functions/hrefTo";
import { socialList } from "src/socialMediaConfig";
import 'src/components/FirstArea/SubeventButton/SubeventButton.scss';

const SubeventButton = () => {
    const lang = useContext(LangContext);

    return (
        <div className="subevent-btn" onClick={() => hrefTo(socialList[4])}>
            <div className="label">{lang.PROMOTION_1_LABEL}</div>
            <div className="hgl">{lang.PROMOTION_1_TITLE_BOLD}</div>
            <div className="text">{lang.PROMOTION_1_TITLE}&emsp;</div>
            <div className="hgl text-stroke">›</div>
        </div>
    );
};

export default SubeventButton;