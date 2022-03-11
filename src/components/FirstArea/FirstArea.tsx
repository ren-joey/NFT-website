import { useContext } from 'react';
import Counter from 'src/components/FirstArea/Counter';
import 'src/components/FirstArea/FirstArea.scss';
import { EventContext } from 'src/Context/EventContext';
import BetamonStage from './BetamonStage';
import BetamonStagePhone from './BetamonStagePhone';
import RevealTime from './RevealTime';
import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import MintBlock from './MintBlock';

const FirstArea = () => {
    const { status } = useContext(EventContext);

    const mintArea = () => {
        switch(status) {
            case -1:
                return (
                    <BetamonStage />
                );
            case 0:
            case 1:
                return (
                    <MintBlock />
                );
            case 2:
                return (
                    <div>解盲了</div>
                );
            default:
                return false;
        }
    };

    return (
        <div className="first-area">
            <div className="front-container">

                {/* mint 區塊 */}
                { mintArea() }

                {/* 時間及倒數區塊 */}
                <RevealTime />
                <Counter />

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