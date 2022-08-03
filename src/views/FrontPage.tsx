import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useState } from 'react';
import { scrollTriggerInit, scrollTriggerKillAll } from 'src/animation/scrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import BgEffects from 'src/components/BgEffects';
import Header from 'src/components/Header/Header';
import { EventContext } from 'src/Context/EventContext';
import { getParameterByName } from 'src/utils/url/getParameterByName';
import ScrollDownIcon from 'src/components/Shared/ScrollDownIcon';
import BackToTop from 'src/components/Shared/BackToTopIcon';
import ResizeListener from 'src/functions/ResizeListener';

// 語系相關
import { LangContext } from 'src/Context/LangContext';
import ZH_CN from 'src/lang/ZH_CN';
import ZH_TW from 'src/lang/ZH_TW';

import 'src/views/FrontPage.scss';
import CountingHandler from 'src/functions/CountingHandler';
import ToBeAnnounced from 'src/components/ToBeAnnounced';
import { DeviceString, LangString } from 'src/@types/basicVariable';
import VbcLabs from 'src/components/VbcLabs/VbcLabs';
import FAQ from 'src/components/FAQ/FAQ';
import Footer from 'src/components/Footer';
import FirstArea from 'src/components/FirstArea/FirstArea';
import AboutB from 'src/components/AboutB/AboutB';
import KolSupport from 'src/components/KolSupport/KolSupport';
import MediaSupport from 'src/components/MediaSupport/MediaSupport';
import Roadmap from 'src/components/Roadmap/Roadmap';
import GlobalAlert from 'src/components/Global/GlobalAlert';

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
    const buttonSize = useMemo<React.CSSProperties>(() => {
        if (device === 'desktop') {
            return { margin: '2rem 0 1rem', whiteSpace: 'nowrap' };
        }
        return {
            margin: '1rem 0 0.6rem',
            padding: '0.6rem 1.4rem',
            fontSize: '1.4rem',
            whiteSpace: 'nowrap'
        };
    }, [device]);

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

    return (
        <LangContext.Provider value={{ ...lang }}>
            <EventContext.Provider
                value={{
                    selectedLang,
                    setSelectedLang,
                    device,
                    buttonSize,
                    status,
                    setStatus,
                    counter,
                    setCounter,
                    end,
                    setEnd,
                    diff,
                    setDiff
                }}
            >
                {/* 全局共用彈窗 */}
                <GlobalAlert />

                <div className="fp-wrapper">
                    <Header
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                    />

                    <div className="fp-container">
                        <FirstArea />
                        <AboutB selectedLang={selectedLang} />
                        <KolSupport total={5} />
                        <MediaSupport total={6} />
                        <Roadmap selectedLang={selectedLang} />
                    </div>

                    {/* to be announced 旋轉效果 */}
                    <ToBeAnnounced />

                    {/* 開賣期 */}
                    <div className="fp-container">
                        <VbcLabs />
                        <FAQ />
                    </div>

                    {/* 地球效果 */}
                    <Footer />

                    {/* 底部免責聲明 */}
                    {/* <Statement /> */}

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