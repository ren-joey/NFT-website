import { langContext } from 'src/Context/LangContext';
import 'src/components/FirstArea/FirstArea.scss';
import { useContext } from 'react';
import Counter from 'src/components/FirstArea/Counter';

const FirstArea = () => {
    const lang = useContext(langContext);
    return (
        <div className="first-area">
            <div className="front-container">
                <div className="b-alien-area">
                    <div className="spotlight"></div>
                    <div className="spotlight reverse"></div>
                </div>

                <div className="reveal-time-area">
                    <div className="reveal-time">
                        March 1 2022 13:00:00 UTC+8
                    </div>
                </div>

                <Counter />

                <div className="title-area">
                    <div className="title"
                        dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_TITLE}}
                    ></div>
                    <div className="desc"
                        dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_DESC}}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default FirstArea;