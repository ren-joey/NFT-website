import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useMemo, useState } from "react";
import { scrollTriggerInit, scrollTriggerKillAll } from "src/animation/scrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import BgEffects from "src/components/BgEffects";
import Header from "src/components/Header/Header";
import { EventContext } from "src/Context/EventContext";
import { getParameterByName } from "src/utils/url/getParameterByName";
import ScrollDownIcon from "src/components/Shared/ScrollDownIcon";
import BackToTop from "src/components/Shared/BackToTopIcon";
import ResizeListener from "src/functions/ResizeListener";

// 語系相關
import { LangContext } from "src/Context/LangContext";
import ZH_CN from "src/lang/ZH_CN";
import ZH_TW from "src/lang/ZH_TW";

import 'src/views/FrontPage.scss';
import CountingHandler from "src/CountingHandler";
import ToBeAnnounced from "src/components/ToBeAnnounced";
import { DeviceString, LangString } from "src/@types/basicVariable";
import LazyStaticDom from "src/components/LazyComponents/LazyStaticDom";
import LazyFirstArea from "src/components/LazyComponents/LazyFirstArea";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FrontPage = () => {
    const [device, setDevice] = useState<DeviceString>(window.innerWidth >= 992 ? 'desktop' : 'phone');
    const [status, setStatus] = useState(CountingHandler.status);
    const [counter, setCounter] = useState(CountingHandler.getDateTime());
    const [end, setEnd] = useState(CountingHandler.getEnd());
    const [diff, setDiff] = useState(CountingHandler.diff);
    const prevLang = getParameterByName('lang') as LangString
        || localStorage.getItem('lang') as LangString
        || 'ZH_TW';
    const prevLangObj = prevLang === 'ZH_TW'
        ? {...ZH_TW}
        : {...ZH_CN};
    const [lang, setLang] = useState(prevLangObj);
    const [selectedLang, setSelectedLang] = useState<LangString>(prevLang);

    useEffect(() => {
        let previousDevice: DeviceString = device;

        const rootEventLister = () => {
            if (window.innerWidth >= 992) {
                if (previousDevice === 'phone') scrollTriggerKillAll();
                setDevice('desktop');
                previousDevice = 'desktop';
            } else {
                if (previousDevice === 'desktop') scrollTriggerKillAll();
                setDevice('phone');
                previousDevice = 'phone';
            }
        };

        // RwdContext 監聽事件
        ResizeListener.add(rootEventLister);

        // 全局滾動動畫
        scrollTriggerInit();

        return () => {
            ResizeListener.erase();
            scrollTriggerKillAll();
            window.onload = () => {};
        };
    }, []);

    useEffect(() => {
        if (selectedLang === 'ZH_TW') {
            localStorage.setItem('lang', selectedLang);
            setLang({...ZH_TW});
            document.title = ZH_TW.WEB_TITLE;
        } else if  (selectedLang === 'ZH_CN') {
            localStorage.setItem('lang', selectedLang);
            setLang({...ZH_CN});
            document.title = ZH_CN.WEB_TITLE;
        } else {
            setLang({...ZH_TW});
            document.title = ZH_TW.WEB_TITLE;
        }
    }, [selectedLang]);

    const staticLazyFirstArea = useMemo(
        () => (<LazyFirstArea selectedLang={selectedLang} />),
        []
    );

    const staticLazyDoms = useMemo(() => (
        <Suspense fallback={null}>
            {/* 開賣期 */}
            <div className="fp-container">
                <LazyStaticDom entry={
                    import('src/components/VbcLabs/VbcLabs')
                } />

                <LazyStaticDom entry={
                    import('src/components/FAQ/FAQ')
                } />
            </div>

            <LazyStaticDom entry={
                import('src/components/Footer')
            } />

            {/* 召喚聲明 */}
            <LazyStaticDom entry={
                import('src/components/Statement')
            } />
        </Suspense>
    ), []);

    return (
        <LangContext.Provider value={{ ...lang }}>
            <EventContext.Provider value={{
                selectedLang,
                setSelectedLang,
                device,
                status,
                setStatus,
                counter,
                setCounter,
                end,
                setEnd,
                diff,
                setDiff
            }}>
                <div className="fp-wrapper">
                    <Header
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                    />

                    { staticLazyFirstArea }

                    <ToBeAnnounced />

                    { staticLazyDoms }

                    {/* fixed 背景特效區塊 */}
                    <BgEffects />

                    {/* fixed 第一視覺往下滾動提示 */}
                    <ScrollDownIcon />

                    {/* fixed 返回最頂端按鈕 */}
                    <BackToTop />

                </div>
            </EventContext.Provider>
        </LangContext.Provider>
    );
};

export default FrontPage;