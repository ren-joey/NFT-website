
import gsap from 'gsap';
import { useContext, useEffect, useState } from 'react';
import { scrollToRoadmap, scrollToTop } from 'src/animation/scrollToTrigger';
import 'src/components/Header/Header.scss';
import LangBtn from 'src/components/Header/LangBtn';
import { RwdContext } from 'src/Context/RwdContext';
import { getResources } from 'src/functions/loader';
import { LangString } from 'src/lang';
import socialList from './config';
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

    const getIcon = (socialName: string): React.CSSProperties => {
        const iconKey = `${socialName}_icon`;
        return {backgroundImage: `url(${getResources(iconKey)})`};
    };

    return (
        <div id="header" className="header">
            <div className="header-container">
                <div
                    className="logo"
                    onClick={() => scrollToTop()}
                    style={
                        { backgroundImage: `url(${getResources('vbc_logo')})` }
                    }
                ></div>
                <div className="nav-area">
                    {
                        socialList.map((social, idx) => social.visible
                            ? <div className="nav" key={idx}>
                                <div className="icon" style={getIcon(social.iconName)}></div>
                                <div className="nav-text">
                                    {social.title}
                                </div>
                            </div>
                            : '')
                    }
                    <div
                        className="nav"
                        onClick={() => scrollToRoadmap()}
                    >
                        <div className="icon" style={getIcon('skull')}></div>
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