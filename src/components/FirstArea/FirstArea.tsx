import 'src/components/FirstArea/FirstArea.scss';
import BetamonStagePhone from './BetamonStagePhone';
import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import Web3Provider from './Web3Provider/Web3Provider';

const FirstArea = () => (
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

export default FirstArea;