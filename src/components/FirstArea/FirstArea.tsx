import 'src/components/FirstArea/FirstArea.scss';
import BetamonStagePhone from './BetamonStagePhone';
import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import { useContext, useEffect } from 'react';
import { defaultEventContext, EventContext } from 'src/Context/EventContext';
import CountingHandler from 'src/CountingHandler';
import Web3Provider from '../Web3Service/Web3Provider';

const FirstArea = () => {
    const {
        setDiff,
        setCounter,
        setStatus,
        setEnd
    } = useContext(EventContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDiff(CountingHandler.diff);
            if (CountingHandler.diff <= 0) {
                setCounter(defaultEventContext.counter);
            } else {
                setCounter(CountingHandler.getDateTime());
            }
            setStatus(CountingHandler.status);
            setEnd(CountingHandler.getEnd());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="first-area">
            <div className="front-container">

                {/* 包含 mint 區塊、時間及倒數 */}
                <Web3Provider />

                {/* 主標題、介紹及連結 */}
                <TitleArea />
                <LinkArea />

                {/* phone 版 betamon 區域 */}
                <BetamonStagePhone />
            </div>
        </div>
    );
};

export default FirstArea;