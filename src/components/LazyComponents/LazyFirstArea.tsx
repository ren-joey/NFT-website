import React, { Suspense } from "react";
import { LangString } from "src/@types/basicVariable";
import FirstArea from "../FirstArea/FirstArea";

interface Props {
    selectedLang: LangString
}

const LazyFirstArea = React.memo(function LazyFirstArea ({
    selectedLang
}: Props) {
    const AboutB = React.lazy(() => import('src/components/AboutB/AboutB'));
    const KolSupport = React.lazy(() => import('src/components/KolSupport/KolSupport'));
    const MediaSupport = React.lazy(() => import('src/components/MediaSupport/MediaSupport'));
    const Roadmap = React.lazy(() => import('src/components/Roadmap/Roadmap'));

    return (
        <div className="fp-container">
            <FirstArea />

            <Suspense fallback={null}>
                <AboutB selectedLang={selectedLang} />
                <KolSupport total={5} />
                <MediaSupport total={6} />
                <Roadmap selectedLang={selectedLang} />
            </Suspense>
        </div>
    );
});

export default LazyFirstArea;