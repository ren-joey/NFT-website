import 'src/components/FirstArea/FirstArea.scss';
import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import { Suspense, useMemo } from 'react';
import BetamonStagePhone from './BetamonStage/BetamonStagePhone';
import LazyStaticDom from '../LazyComponents/LazyStaticDom';

const FirstArea = () => {
    const staticWeb3Provider = useMemo(() => (
        <div className="front-container">
            {/* 包含 mint 區塊、時間及倒數 */}
            <Suspense fallback={null}>
                <LazyStaticDom entry={
                    import('src/components/Web3Service/Web3Provider')
                } />
            </Suspense>

            {/* 主標題、介紹及連結 */}
            <TitleArea />
            <LinkArea />

            {/* phone 版 betamon 區域 */}
            <BetamonStagePhone />
        </div>

    ), []);

    return (
        <div className="first-area">
            { staticWeb3Provider }
        </div>
    );
};

export default FirstArea;