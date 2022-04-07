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
    if (amount === null || maxBalance === null) return;
    setAlertData({
        enable: true,
        content: lang.MINT_ALERT.replace('${}', amount.toString()).replace('${}', maxBalance.toString()),
        btnList: [
            {
                text: lang.CANCEL,
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