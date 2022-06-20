import { EventBus } from "src/bus";
import { FormEssentials } from "../FormAlert";

const Terms = (formEssentials: FormEssentials) => {
    const {
        form,
        setForm
    } = formEssentials;

    return (
        <>
            <div
                className="nft-term"
                onClick={() => setForm((form) => ({
                    ...form,
                    term_1: !form.term_1
                }))}>
                <div className={`nft-term-check-box ${form.term_1 ? 'checked': ''}`}></div>
                <div className="nft-term-text">
                    確定實體化將不可撤回取消
                </div>
            </div>

            <div
                className="nft-term"
                onClick={() => setForm((form) => ({
                    ...form,
                    term_2: !form.term_2
                }))}>
                <div className={`nft-term-check-box ${form.term_2 ? 'checked': ''}`}></div>
                <div className="nft-term-text">
                    本人已詳閱相關說明<span className="clickable-span" onClick={(v) => {
                        v.stopPropagation();
                        EventBus.$emit('faq');
                    }}>【FAQ】</span>
                </div>
            </div>
        </>
    );
};

export default Terms;