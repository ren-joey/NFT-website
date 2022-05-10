import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import BetamonStagePhone from './BetamonStage/BetamonStagePhone';
import React, { Suspense, useMemo } from 'react';
import 'src/components/FirstArea/FirstArea.scss';
import 'src/components/FirstArea/PurpleBlock/MintBody.scss';

const FirstArea = () => {
    const Web3Provider = useMemo(
        () => React.lazy(() => import('../Web3Service/Web3Provider')),
        []
    );

    return (
        <div className="first-area">
            <div className="front-container">
                {/* 包含 mint 區塊、時間及倒數 */}
                <Suspense fallback={<></>}>
                    <Web3Provider />
                </Suspense>

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