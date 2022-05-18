import enableGlobalAlert from "src/functions/enableGlobalAlert";
import stringReplacer from "src/utils/stringFormat/stringReplacer";
import { IMintAlertHandler } from "./mintAlertHandler";

const enableNotEnoughEth = ({
    lang,
    maxBalance,
    mintPriceEth
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'lang'|'mintPriceEth'
    >
) => {
    if (maxBalance === null || mintPriceEth === null) return;
    enableGlobalAlert({
        content: stringReplacer(lang.NOT_ENOUGH_ETH_ALERT, mintPriceEth),
        btnList: [
            { text: lang.I_WILL_PREPARE_MORE_ETH }
        ]
    });
};

export default enableNotEnoughEth;