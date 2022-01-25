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
import { RwdContext } from "src/Context/RwdContext";
import EN from "src/lang/EN";
import ZH_CN from "src/lang/ZH_CN";
import ZH_TW from "src/lang/ZH_TW";
import 'src/views/FrontPage.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FrontPage = () => {
    const [device, setDevice] = useState(window.innerWidth >= 992 ? 'desktop' : 'phone');
    const zhTW = ZH_TW;
    const zhCN = ZH_CN;
    const [lang, setLang] = useState({...zhTW});
    const [selectedLang, setSelectedLang] = useState('ZH_TW');
    const previousDevice = device;

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                if (previousDevice === 'phone') window.location.reload();
                setDevice('desktop');
            } else {
                if (previousDevice === 'desktop') window.location.reload();
                setDevice('phone');
            }
        });

        scrollTriggerInit();
    }, []);

    useEffect(() => {
        if (selectedLang === 'ZH_TW') {
            setLang({...zhTW});
        } else if  (selectedLang === 'ZH_CN') {
            setLang({...zhCN});
        } else if (selectedLang === 'EN') {
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

                        <AboutB />

                        <Roadmap />
                    </div>

                    <Footer />

                    <BgEffects />

                    {/* <div className="fp-preview"></div> */}
                </div>
            </RwdContext.Provider>
        </LangContext.Provider>
    );
};

export default FrontPage;