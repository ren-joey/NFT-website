import 'src/components/Header/PhoneLangBtn.scss';
import { getResources } from 'src/functions/loader';
import { LangString } from 'src/@types/basicVariable';

interface ILangBtn {
    selectedLang: LangString,
    lang: LangString,
    title: string,
    setSelectedLang: (lang: LangString) => void
}

const PhoneLangBtn = ({ selectedLang, setSelectedLang, lang, title }: ILangBtn) => (
    <div
        className={`lang-btn ${selectedLang === lang ? 'active' : ''}`}
        onClick={() => setSelectedLang(lang)}
    >
        <div className="skull-outline-icon" style={
            { backgroundImage: `url(${getResources('skull_icon_outline')})` }
        }></div>
        <div className="text">
            {title}
        </div>
    </div>
);

export default PhoneLangBtn;