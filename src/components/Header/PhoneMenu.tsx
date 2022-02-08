import { useEffect, useState } from 'react';
import { scrollToRoadmap } from 'src/animation/scrollToTrigger';
import 'src/components/Header/PhoneMenu.scss';
import { getResources } from 'src/functions/loader';
import { LangString } from 'src/lang';
import { socialList } from 'src/socialMediaConfig';
import PhoneLangBtn from './PhoneLangBtn';

interface IPhoneMenu {
    menuStatus: boolean,
    selectedLang: LangString,
    setSelectedLang: (lang: LangString) => void,
    toggleMenuStatus: () => void
}

const PhoneMenu = ({
    menuStatus,
    selectedLang,
    setSelectedLang,
    toggleMenuStatus
}: IPhoneMenu) => {
    const [display, setDisplay] = useState(true);
    let timeout: NodeJS.Timeout|undefined = undefined;

    useEffect(() => {
        if (menuStatus === false) {
            setDisplay(false);
            clearTimeout(timeout as NodeJS.Timeout);
            timeout = setTimeout(() => {
                setDisplay(true);
            }, 0);
        }
    }, [menuStatus]);

    const animateMask = (idx: number) => {
        if (display) {
            return <div className={`animate-mask idx-${idx}`}></div>;
        }
        return '';
    };

    const selectLang = (lang: LangString) => {
        setSelectedLang(lang);
        toggleMenuStatus();
    };

    const getIcon = (socialName: string): React.CSSProperties => {
        const iconKey = `${socialName}_icon`;
        return {backgroundImage: `url(${getResources(iconKey)})`};
    };

    return (
        <div className={`menu-phone ${menuStatus ? 'active' : ''}`}>
            {
                socialList.map((social, idx) => social.visible &&
                    <div className="menu-btn" key={idx}>
                        <div className="icon" style={getIcon(social.iconName)}></div>
                        <div className="text">
                            {social.title}
                        </div>
                    </div>
                )
            }
            <div
                className="menu-btn"
                onClick={() => {
                    scrollToRoadmap();
                    toggleMenuStatus();
                }}
            >
                <div className="icon" style={getIcon('skull')}></div>
                <div className="text">ROADMAP</div>
            </div>

            <div className="lang-area-phone">
                <div className="title">language</div>
                <PhoneLangBtn
                    selectedLang={selectedLang}
                    setSelectedLang={selectLang}
                    lang='ZH_CN'
                    title='简体中文'
                />
                <PhoneLangBtn
                    selectedLang={selectedLang}
                    setSelectedLang={selectLang}
                    lang='ZH_TW'
                    title='繁體中文'
                />
                <PhoneLangBtn
                    selectedLang={selectedLang}
                    setSelectedLang={selectLang}
                    lang='EN'
                    title='English'
                />
            </div>

            { animateMask(1) }
            { animateMask(2) }
        </div>
    );
};

export default PhoneMenu;