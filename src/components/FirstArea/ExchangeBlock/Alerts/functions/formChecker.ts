import enableGlobalAlert from "src/functions/enableGlobalAlert";
import formatChecker from "src/functions/formatChecker";
import { FormData, FormWarning } from "../FormAlert";

const formChecker = (
    form: FormData,
    onComplete: () => void,
    onError: (key: FormWarning) => void
) => {
    const error: FormWarning = {
        term_1: '',
        term_2: ''
    };

    if (
        !form.name
        || !form.phone
        || !form.email
    ) {
        error.term_1 = '資料填寫不完全';
    } else {
        const emailRes = formatChecker.email(form.email);
        if (emailRes !== true) error.term_1 = emailRes;

        const phoneRes = formatChecker.phone(form.phone);
        if (phoneRes !== true) error.term_1 = phoneRes;

        const nameRes = formatChecker.noNumber(form.name);
        if (nameRes !== true) error.term_1 = '姓名' + nameRes;
    }

    if (!form.country
        || !form.city
        || !form.address) {
        error.term_2 = '資料填寫不完全';
    }

    onError(error);

    if (!error.term_1 && !error.term_2) {
        if (!form.term_1 || !form.term_2) {
            enableGlobalAlert({
                content: '請閱讀並同意兌換條款',
                btnList: [
                    {text: '確定'}
                ]
            });
        } else onComplete();
    }
};

export default formChecker;