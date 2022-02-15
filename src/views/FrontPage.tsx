import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { scrollTriggerInit } from "src/animation/scrollTrigger";
import AboutB from "src/components/AboutB/AboutB";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import BgEffects from "src/components/BgEffects";
import FirstArea from "src/components/FirstArea/FirstArea";
import Footer from "src/components/Footer";
import Header from "src/components/Header/Header";
import Roadmap from "src/components/Roadmap/Roadmap";
import { DeviceString, RwdContext } from "src/Context/RwdContext";
import { getParameterByName } from "src/utils/url/getParameterByName";
import ScrollDownIcon from "src/components/Shared/ScrollDownIcon";
import BackToTop from "src/components/Shared/BackToTopIcon";
import ResizeListener from "src/functions/ResizeListener";

// 語系相關
import { LangString } from "src/lang";
import { LangContext } from "src/Context/LangContext";
import EN from "src/lang/EN";
import ZH_CN from "src/lang/ZH_CN";
import ZH_TW from "src/lang/ZH_TW";

// style 相關
import 'src/views/FrontPage.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scrollTriggerKillAll = () => {
    ScrollTrigger.getAll().forEach((scrollTrigger) => {
        if (scrollTrigger.vars.id) {
            scrollTrigger.endAnimation();
            scrollTrigger.kill();
        }
    });
};

const FrontPage = () => {
    const [device, setDevice] = useState<DeviceString>(window.innerWidth >= 992 ? 'desktop' : 'phone');
    const zhTW = ZH_TW;
    const zhCN = ZH_CN;
    const prevLang = getParameterByName('lang') as LangString
        || localStorage.getItem('lang') as LangString
        || 'ZH_TW';
    const prevLangObj = prevLang === 'EN'
        ? {...EN}
        : prevLang === 'ZH_TW'
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
            setLang({...zhTW});
            document.title = zhTW.WEB_TITLE;
        } else if  (selectedLang === 'ZH_CN') {
            localStorage.setItem('lang', selectedLang);
            setLang({...zhCN});
            document.title = zhCN.WEB_TITLE;
        } else if (selectedLang === 'EN') {
            localStorage.setItem('lang', selectedLang);
            setLang({...EN});
            document.title = EN.WEB_TITLE;
        } else {
            setLang({...zhTW});
            document.title = zhTW.WEB_TITLE;
        }
    }, [selectedLang]);

    return (
        <LangContext.Provider value={{ ...lang }}>
            <RwdContext.Provider value={{ device }}>
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

                    <Footer />

                    <BgEffects />

                    <ScrollDownIcon />

                    <BackToTop />

                    {/* <div className="fp-preview"></div> */}
                </div>
            </RwdContext.Provider>
        </LangContext.Provider>
    );
};

export default FrontPage;