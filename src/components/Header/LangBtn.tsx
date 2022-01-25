import 'src/components/Header/LangBtn.scss';
import { LangString } from 'src/lang';

interface ILangBtn {
    selectedLang: LangString,
    lang: LangString,
    title: string,
    setSelectedLang: (lang: LangString) => void
}

const LangBtn = ({ selectedLang, lang, title, setSelectedLang }: ILangBtn) => (
    <div
        className={`lang-nav ${selectedLang === lang ? 'active' : ''}`}
        onClick={() => setSelectedLang(lang)}
    >
        {title}
    </div>
);

export default LangBtn;