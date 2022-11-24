import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import BetamonStagePhone from './BetamonStage/BetamonStagePhone';
import 'src/components/FirstArea/FirstArea.scss';
import 'src/components/FirstArea/PurpleBlock/MintBody.scss';
import Banner from './Banner/Banner';
import useCounter from 'src/functions/useCounter';

const FirstArea = () => {
    useCounter();

    return (
        <div className="first-area">
            <div className="front-container">
                <Banner />

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