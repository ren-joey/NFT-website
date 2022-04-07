import { IMintAlertHandler } from "./mintAlertHandler";

const enableNotInWhiteList = ({
    disableAlert,
    setAlertData,
    lang
}: Pick<
    IMintAlertHandler,
    'setAlertData'|'disableAlert'|'lang'
    >
) => {
    setAlertData({
        enable: true,
        content: lang.NOT_INT_WHITE_LIST,
        btnList: [
            {
                text: lang.I_WILL_WAIT_MORE,
                onClick: disableAlert
            }
        ]
    });
};

export default enableNotInWhiteList;