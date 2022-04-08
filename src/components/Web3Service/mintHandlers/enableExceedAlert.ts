import { IMintAlertHandler } from "src/components/Web3Service/mintHandlers/mintAlertHandler";
import stringReplacer from "src/utils/stringFormat/stringReplacer";

const enableExceedAlert = ({
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
        content: stringReplacer(lang.MINT_EXCESS_ALERT, maxBalance),
        btnList: [
            {
                text: lang.I_WILL_ADJUST,
                onClick: disableAlert
            }
        ]
    });
};

export default enableExceedAlert;