import stringReplacer from "src/utils/stringFormat/stringReplacer";
import { IMintAlertHandler } from "./mintAlertHandler";

const enableNotEnoughEth = ({
    setAlertData,
    disableAlert,
    lang,
    maxBalance,
    mintPriceEth
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'setAlertData'|'lang'|'disableAlert'|'mintPriceEth'
    >
) => {
    if (maxBalance === null || mintPriceEth === null) return;
    setAlertData({
        enable: true,
        content: stringReplacer(lang.NOT_ENOUGH_ETH_ALERT, mintPriceEth),
        btnList: [
            {
                text: lang.I_WILL_PREPARE_MORE_ETH,
                onClick: disableAlert
            }
        ]
    });
};

export default enableNotEnoughEth;