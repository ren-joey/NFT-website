import { useEffect, useState } from 'react';
import 'src/components/Header/PhoneMenu.scss';
import PhoneLangBtn from './PhoneLangBtn';

interface IPhoneMenu {
    menuStatus: boolean,
    selectedLang: string,
    setSelectedLang: (lang: string) => void,
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

    const selectLang = (lang: string) => {
        setSelectedLang(lang);
        toggleMenuStatus();
    };

    return (
        <div className={`menu-phone ${menuStatus ? 'active' : ''}`}>
            <div className="menu-btn">
                <div className="icon opensea"></div>
                <div className="text">OPENSEA</div>
            </div>
            <div className="menu-btn">
                <div className="icon discord"></div>
                <div className="text">DISCORD</div>
            </div>
            <div className="menu-btn">
                <div className="icon twitter"></div>
                <div className="text">TWITTER</div>
            </div>
            <div className="menu-btn">
                <div className="icon roadmap-icon"></div>
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