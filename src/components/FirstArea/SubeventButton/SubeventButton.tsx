import { useContext } from 'react';
import { LangContext } from 'src/Context/LangContext';
import hrefTo from 'src/functions/hrefTo';
import { socialList } from 'src/configs/socialMediaConfig';
import 'src/components/FirstArea/SubeventButton/SubeventButton.scss';
import { EventContext } from 'src/Context/EventContext';

const SubeventButton = () => {
    const lang = useContext(LangContext);
    const { selectedLang } = useContext(EventContext);

    return (
        <div
            className={`subevent-btn ${selectedLang}`}
            onClick={() => hrefTo(socialList[4])}
        >
            <div className="label">{lang.PROMOTION_LABEL}</div>
            <div className="hgl pre-line">{lang.PROMOTION_TITLE_BOLD}</div>
            <div className="text">{lang.PROMOTION_TITLE}&emsp;</div>
            <div className="hgl text-stroke">›</div>
        </div>
    );
};

export default SubeventButton;