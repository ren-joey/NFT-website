import { IMintAlertHandler } from "./mintAlertHandler";

const enableNotEnoughEth = ({
    setAlertData,
    disableAlert,
    maxBalance,
    mintPriceEth,
    lang
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'setAlertData'|'lang'|'disableAlert'|'mintPriceEth'
    >
) => {
    if (maxBalance === null || mintPriceEth === null) return;
    setAlertData({
        enable: true,
        content: lang.NOT_ENOUGH_ETH_ALERT.replace('${}', mintPriceEth.toString()),
        btnList: [
            {
                text: lang.I_WILL_PREPARE_MORE_ETH,
                onClick: disableAlert
            }
        ]
    });
};

export default enableNotEnoughEth;