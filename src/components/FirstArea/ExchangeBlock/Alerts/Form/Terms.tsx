import { useContext } from 'react';
import { EventBus } from 'src/bus';
import { LangContext } from 'src/Context/LangContext';
import { FormEssentials } from '../FormAlert';

const Terms = ({
    form,
    setForm
}: FormEssentials) => {
    const lang = useContext(LangContext);

    return (
        <>
            <div
                className="nft-term"
                onClick={() => setForm((form) => ({
                    ...form,
                    term_1: !form.term_1
                }))}
            >
                <div className={`nft-term-check-box ${form.term_1 ? 'checked': ''}`}></div>
                <div className="nft-term-text">
                    {lang.FORM_TERM_1}
                </div>
            </div>

            <div
                className="nft-term"
                onClick={() => setForm((form) => ({
                    ...form,
                    term_2: !form.term_2
                }))}
            >
                <div className={`nft-term-check-box ${form.term_2 ? 'checked': ''}`}></div>
                <div className="nft-term-text">
                    {lang.FORM_TERM_2}
                    <span
                        className="clickable-span"
                        onClick={(v) => {
                            v.stopPropagation();
                            EventBus.$emit('faq');
                        }}
                    >
                        【FAQ】
                    </span>
                </div>
            </div>
        </>
    );
};

export default Terms;