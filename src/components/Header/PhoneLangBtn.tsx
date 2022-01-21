import 'src/components/Header/PhoneLangBtn.scss';

interface ILangBtn {
    selectedLang: string,
    lang: string,
    title: string,
    setSelectedLang: (lang: string) => void
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