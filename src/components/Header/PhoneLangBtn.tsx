import 'src/components/Header/PhoneLangBtn.scss';
import { LangString } from 'src/lang';

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
        <div className="text">
            {title}
        </div>
    </div>
);

export default PhoneLangBtn;