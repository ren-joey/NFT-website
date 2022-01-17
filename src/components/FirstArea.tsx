import { langContext } from 'src/Context/LangContext';
import 'src/components/FirstArea.scss';
import { useContext } from 'react';

const FirstArea = () => {
    const lang = useContext(langContext);
    return (
        <div className="first-area">
            <div className="b-alien-area">
                <div className="spotlight"></div>
                <div className="spotlight reverse"></div>
            </div>

            <div className="reveal-time-area">
                <div className="reveal-time">
                    March 1 2022 13:00:00 UTC+8
                </div>
            </div>

            <div className="counter-area">
                <div className="row">
                    <div className="col">
                        <div className="counter">
                            <div className="digit">20</div>
                            <div className="digit-shadow">20</div>
                            <div className="unit">days</div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="counter">
                            <div className="digit idx-2">23</div>
                            <div className="digit-shadow">23</div>
                            <div className="unit">hours</div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="counter">
                            <div className="digit idx-3">59</div>
                            <div className="digit-shadow">59</div>
                            <div className="unit">minutes</div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="counter font-a4-speed">
                            <div className="digit idx-4">59</div>
                            <div className="digit-shadow">59</div>
                            <div className="unit">seconds</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-area">
                <div className="title"
                    dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_TITLE}}
                ></div>
                <div className="desc"
                    dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_DESC}}
                ></div>
            </div>
        </div>
    );
}

export default FirstArea;