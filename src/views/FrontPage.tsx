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
import { LangContext } from "src/Context/LangContext";
import { DeviceString, RwdContext } from "src/Context/RwdContext";
import EN from "src/lang/EN";
import ZH_CN from "src/lang/ZH_CN";
import ZH_TW from "src/lang/ZH_TW";
import 'src/views/FrontPage.scss';
import { getParameterByName } from "src/utils/url/getParameterByName";
import { LangString } from "src/lang";
import ScrollDownIcon from "src/components/Shared/ScrollDownIcon";
import BackToTop from "src/components/Shared/BackToTopIcon";

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
    const prevLang = localStorage.getItem('lang') as LangString || 'ZH_TW';
    const prevLangObj = prevLang === 'EN' ? {...EN} : prevLang === 'ZH_TW' ? {...ZH_TW} : {...ZH_CN};
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

        window.addEventListener('resize', rootEventLister);

        if (!getParameterByName('scroll-trigger')) scrollTriggerInit();

        window.onload = () => {
            document.body.style.overflow = '';
        };

        return () => {
            window.removeEventListener('resize', rootEventLister);
            scrollTriggerKillAll();
            window.onload = () => {};
        };
    }, []);

    useEffect(() => {
        if (selectedLang === 'ZH_TW') {
            localStorage.setItem('lang', selectedLang);
            setLang({...zhTW});
        } else if  (selectedLang === 'ZH_CN') {
            localStorage.setItem('lang', selectedLang);
            setLang({...zhCN});
        } else if (selectedLang === 'EN') {
            localStorage.setItem('lang', selectedLang);
            setLang({...EN});
        } else {
            setLang({...zhTW});
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

                    { device === 'phone' ? <BackToTop /> : '' }

                    {/* <div className="fp-preview"></div> */}
                </div>
            </RwdContext.Provider>
        </LangContext.Provider>
    );
};

export default FrontPage;