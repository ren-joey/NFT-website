import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { scrollTriggerInit, scrollTriggerKillAll } from "src/animation/scrollTrigger";
import AboutB from "src/components/AboutB/AboutB";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import BgEffects from "src/components/BgEffects";
import FirstArea from "src/components/FirstArea/FirstArea";
import Footer from "src/components/Footer";
import Header from "src/components/Header/Header";
import Roadmap from "src/components/Roadmap/Roadmap";
import { DeviceString, EventContext } from "src/Context/EventContext";
import { getParameterByName } from "src/utils/url/getParameterByName";
import ScrollDownIcon from "src/components/Shared/ScrollDownIcon";
import BackToTop from "src/components/Shared/BackToTopIcon";
import ResizeListener from "src/functions/ResizeListener";

// 語系相關
import { LangString } from "src/lang";
import { LangContext } from "src/Context/LangContext";
import ZH_CN from "src/lang/ZH_CN";
import ZH_TW from "src/lang/ZH_TW";

// style 相關
import 'src/views/FrontPage.scss';
import CountingHandler from "src/CountingHandler";
import ToBeAnnounced from "src/components/ToBeAnnounced";
import FAQ from "src/components/FAQ/FAQ";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FrontPage = () => {
    const [device, setDevice] = useState<DeviceString>(window.innerWidth >= 992 ? 'desktop' : 'phone');
    const [status, setStatus] = useState(CountingHandler.status);
    const [counter, setCounter] = useState(CountingHandler.getDateTime());
    const [end, setEnd] = useState(CountingHandler.getEnd());
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

        if (!getParameterByName('scroll-trigger')) {
            scrollTriggerInit();
            // bubbleScrollTrigger();
        }

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
            <EventContext.Provider value={{
                device,
                status,
                setStatus,
                counter,
                setCounter,
                end,
                setEnd
            }}>
                <div className="fp-wrapper">
                    <Header
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                    />

                    <div className="fp-container">
                        <FirstArea />
                        <AboutB selectedLang={selectedLang} />
                        <Roadmap selectedLang={selectedLang} />
                    </div>

                    <ToBeAnnounced />

                    {/* 開賣期 */}
                    <div className="fp-container">
                        <FAQ />
                    </div>

                    <Footer />

                    <BgEffects />
                    <ScrollDownIcon />
                    <BackToTop />

                </div>
            </EventContext.Provider>
        </LangContext.Provider>
    );
};

export default FrontPage;