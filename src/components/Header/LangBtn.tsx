import 'src/components/Header/LangBtn.scss';

interface ILangBtn {
    selectedLang: string,
    lang: string,
    title: string,
    setSelectedLang: (lang: string) => void
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