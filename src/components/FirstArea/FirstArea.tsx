import TitleArea from './TitleArea';
import LinkArea from './LinkArea';
import BetamonStagePhone from './BetamonStage/BetamonStagePhone';
import React, { Suspense, useContext, useMemo } from 'react';
import 'src/components/FirstArea/FirstArea.scss';
import 'src/components/FirstArea/PurpleBlock/MintBody.scss';
import { EventContext } from 'src/Context/EventContext';
import Banner from './Banner/Banner';

const FirstArea = () => {
    const Web3Provider = useMemo(
        () => React.lazy(() => import('../Web3Service/Web3Provider')),
        []
    );
    const { status } = useContext(EventContext);

    return (
        <div className="first-area">
            <div className="front-container">
                {/* 包含 mint 區塊、時間及倒數 */}
                {
                    status < 5 ? (
                        <Suspense fallback={<></>}>
                            <Web3Provider />
                        </Suspense>
                    ) : (
                        <Banner />
                    )
                }

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