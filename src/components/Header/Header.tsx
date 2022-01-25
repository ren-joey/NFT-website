
import { useState } from 'react';
import { scrollToRoadmap, scrollToTop } from 'src/animation/scrollToTrigger';
import 'src/components/Header/Header.scss';
import LangBtn from 'src/components/Header/LangBtn';
import MenuBtn from './MenuBtn';
import PhoneMenu from './PhoneMenu';

interface IHeader {
    selectedLang: string,
    setSelectedLang: (selectedLang: string) => void
}

const Header = ({ selectedLang, setSelectedLang }: IHeader) => {
    const [menuStatus, setMenuStatus] = useState(false);
    const toggleMenuStatus = () => {
        setMenuStatus(!menuStatus);
    };

    return (
        <div className="header">
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

                <MenuBtn
                    active={menuStatus}
                    onClick={toggleMenuStatus}
                />

                <PhoneMenu
                    menuStatus={menuStatus}
                    selectedLang={selectedLang}
                    setSelectedLang={setSelectedLang}
                    toggleMenuStatus={toggleMenuStatus}
                />
            </div>

            <div className="blur-glass"></div>
        </div>
    );
};

export default Header;