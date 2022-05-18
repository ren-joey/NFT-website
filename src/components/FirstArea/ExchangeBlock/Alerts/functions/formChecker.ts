import enableGlobalAlert from "src/functions/enableGlobalAlert";
import formatChecker from "src/functions/formatChecker";
import { FormData, FormWarning } from "../FormAlert";

const formChecker = (
    form: FormData,
    onComplete: () => void,
    onError: (key: FormWarning) => void
) => {
    if (
        !form.name
        || !form.phone
        || !form.email
    ) {
        enableGlobalAlert({
            content: '請完整填寫您的兌換資料',
            btnList: [
                {text: '確定'}
            ]
        });
        onError({
            term_1: '資料填寫不完全',
            term_2: ''
        });
    } else if (!form.country
        || !form.city
        || !form.zip
        || !form.address) {
        enableGlobalAlert({
            content: '請完整填寫您的兌換資料',
            btnList: [
                {text: '確定'}
            ]
        });
        onError({
            term_1: '',
            term_2: '資料填寫不完全'
        });
    } else {
        const emailRes = formatChecker.email(form.email);
        if (emailRes !== true) {
            enableGlobalAlert({
                content: emailRes,
                btnList: [
                    {text: '確定'}
                ]
            });
            onError({
                term_1: emailRes,
                term_2: ''
            });
        } else if (!form.term_1 || !form.term_2) {
            enableGlobalAlert({
                content: '請閱圖並同意兌換條款',
                btnList: [
                    {text: '確定'}
                ]
            });
            onError({
                term_1: '',
                term_2: ''
            });
        } else onComplete();
    }
};

export default formChecker;