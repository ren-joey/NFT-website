import { useContext } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';

const TitleArea = () => {
    const lang = useContext(LangContext);
    const { status } = useContext(EventContext);

    return (
        <div className="title-area">
            <div className="title pre-line">
                {
                    status > -1
                        ? lang.FIRST_AREA_TITLE_ARRIVED
                        : lang.FIRST_AREA_TITLE
                }
            </div>
            <div
                className="desc pre-line"
                dangerouslySetInnerHTML={{
                    __html: lang.FIRST_AREA_DESC
                }}
            >
            </div>
        </div>
    );
};

export default TitleArea;