import enableGlobalAlert from "src/functions/enableGlobalAlert";
import { Lang } from "src/lang";

const enableNotInWhiteList = ({
    lang
}: {
    lang: Lang
}) => {
    enableGlobalAlert({
        content: lang.NOT_IN_WHITE_LIST,
        btnList: [
            { text: lang.I_WILL_WAIT_MORE }
        ]
    });
};

export default enableNotInWhiteList;