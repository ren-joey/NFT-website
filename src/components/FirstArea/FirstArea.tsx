import Counter from 'src/components/FirstArea/Counter';
import 'src/components/FirstArea/FirstArea.scss';
import BetamonStagePhone from './BetamonStagePhone';
import RevealTime from './RevealTime';
import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import Web3Provider from './Web3Provider/Web3Provider';

const FirstArea = () => (
    <div className="first-area">
        <div className="front-container">

            <Web3Provider />

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

export default FirstArea;