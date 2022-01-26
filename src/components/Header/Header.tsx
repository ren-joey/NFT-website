
import gsap from 'gsap';
import { useContext, useEffect, useState } from 'react';
import { scrollToRoadmap, scrollToTop } from 'src/animation/scrollToTrigger';
import 'src/components/Header/Header.scss';
import LangBtn from 'src/components/Header/LangBtn';
import { RwdContext } from 'src/Context/RwdContext';
import { LangString } from 'src/lang';
import MenuBtn from './MenuBtn';
import PhoneMenu from './PhoneMenu';

interface IHeader {
    selectedLang: LangString,
    setSelectedLang: (selectedLang: LangString) => void
}

const Header = ({ selectedLang, setSelectedLang }: IHeader) => {
    const { device } = useContext(RwdContext);
    const [menuStatus, setMenuStatus] = useState(false);
    const toggleMenuStatus = () => {
        setMenuStatus(!menuStatus);
    };

    useEffect(() => {
        gsap.set('#header', {
            scrollTrigger: {
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    targets: '#header',
                    className: 'header-scrolled'
                }
            }
        });
    }, []);

    return (
        <div id="header" className="header">
            <div className="header-container">
                <div className="logo" onClick={() => scrollToTop()}></div>
                <div className="nav-area">
                    <div className="nav">
                        <div className="icon opensea"></div>
                        <div className="nav-text">OPENSEA</div>
                    </div>
                    <div className="nav">
                        <div className="icon discord"></div>
                        <div className="nav-text">DISCORD</div>
                    </div>
                    <div className="nav">
                        <div className="icon twitter"></div>
                        <div className="nav-text">TWITTER</div>
                    </div>
                    <div
                        className="nav"
                        onClick={() => scrollToRoadmap()}
                    >
                        <div className="icon roadmap-icon"></div>
                        <div className="nav-text">ROADMAP</div>
                    </div>
                </div>

                <div className="lang-area pc">
                    <LangBtn
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                        lang='ZH_CN'
                        title='简'
                    />
                    <LangBtn
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                        lang='ZH_TW'
                        title='繁'
                    />
                    <LangBtn
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                        lang='EN'
                        title='EN'
                    />
                </div>

                <div
                    className="roadmap-btn phone"
                    onClick={() => scrollToRoadmap()}
                >
                    <div className="text">ROADMAP</div>
                </div>

                {
                    device === 'phone' ?
                        <MenuBtn
                            active={menuStatus}
                            onClick={toggleMenuStatus}
                        /> : ''
                }

                {
                    device === 'phone' ?
                        <PhoneMenu
                            menuStatus={menuStatus}
                            selectedLang={selectedLang}
                            setSelectedLang={setSelectedLang}
                            toggleMenuStatus={toggleMenuStatus}
                        /> : ''
                }
            </div>

            <div className="blur-glass"></div>
        </div>
    );
};

export default Header;