import { IMintAlertHandler } from "./mintAlertHandler";

const enableExcessAlert = ({
    maxBalance,
    setAlertData,
    lang,
    disableAlert
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'setAlertData'|'lang'|'disableAlert'
    >
) => {
    if (maxBalance === null) return;
    setAlertData({
        enable: true,
        content: lang.MINT_EXCESS_ALERT.replace('${}', maxBalance.toString()),
        btnList: [
            {
                text: lang.I_WILL_ADJUST,
                onClick: disableAlert
            }
        ]
    });
};

export default enableExcessAlert;