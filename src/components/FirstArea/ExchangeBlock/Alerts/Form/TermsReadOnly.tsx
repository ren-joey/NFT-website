import { lang } from "moment";
import { useContext } from "react";
import { LangContext } from "src/Context/LangContext";

const TermsReadOnly = () => {
    const lang = useContext(LangContext);

    return (
        <>
            <div className="nft-term mt-2rem">
                <div className="nft-term-check-box checked"></div>
                <div className="nft-term-text">
                    {lang.FORM_TERM_1}
                </div>
            </div>

            <div className="nft-term">
                <div className="nft-term-check-box checked"></div>
                <div className="nft-term-text">
                    {lang.FORM_TERM_2}【FAQ】
                </div>
            </div>
        </>
    );
};

export default TermsReadOnly;