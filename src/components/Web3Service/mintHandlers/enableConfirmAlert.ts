import stringReplacer from "src/utils/stringFormat/stringReplacer";
import fetchMintBetamon from "./fetchMintBetamon";
import { IMintAlertHandler } from "./mintAlertHandler";

const enableConfirmAlert = ({
    setAlertData,
    disableAlert,
    amount,
    maxBalance,
    lang,
    fetch,
    mintMethodName,
    mintPrice
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'setAlertData'|'lang'|'disableAlert'|'amount'|'fetch'|'mintMethodName'|'mintPrice'
    >
) => {
    if (amount === null
        || maxBalance === null
        || mintPrice === null) return;

    setAlertData({
        enable: true,
        content: stringReplacer(lang.MINT_ALERT, amount, maxBalance),
        btnList: [
            {
                text: lang.CANCEL,
                type: 'gray',
                onClick: disableAlert
            },
            {
                text: lang.CONFIRM,
                onClick: () => {
                    disableAlert();
                    fetchMintBetamon({
                        amount,
                        disableAlert,
                        fetch,
                        lang,
                        mintMethodName,
                        mintPrice,
                        setAlertData
                    });
                }
            }
        ]
    });
};

export default enableConfirmAlert;