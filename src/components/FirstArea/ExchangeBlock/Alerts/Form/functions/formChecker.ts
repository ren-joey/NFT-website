import enableGlobalAlert from "src/functions/enableGlobalAlert";
import formatChecker from "src/functions/formatChecker";
import { Lang } from "src/lang";
import { FormData, FormWarning } from "../../FormAlert";

const formChecker = (
    lang: Lang,
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
        error.term_1 = lang.FORM_NOT_COMPLETELY_FILLED;
    } else {
        const emailRes = formatChecker.email(form.email);
        if (emailRes !== true) error.term_1 = emailRes;

        const phoneRes = formatChecker.phone(form.phone);
        if (phoneRes !== true) error.term_1 = phoneRes;

        const nameRes = formatChecker.noNumber(form.name);
        if (nameRes !== true) error.term_1 = lang.FULL_NAME + nameRes;
    }

    if (!form.country
        || !form.city
        || !form.address) {
        error.term_2 = lang.FORM_NOT_COMPLETELY_FILLED;
    }

    onError(error);

    if (!error.term_1 && !error.term_2) {
        if (!form.term_1 || !form.term_2) {
            enableGlobalAlert({
                content: lang.READ_AND_ACCEPT_THE_TERMS,
                btnList: [
                    {text: lang.CONFIRM}
                ]
            });
        } else onComplete();
    }
};

export default formChecker;