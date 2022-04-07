import { IMintAlertHandler } from "./mintAlertHandler";

const enableExceedMaxSupplyAlert = ({
    setAlertData,
    lang,
    disableAlert
}: Pick<
    IMintAlertHandler,
    'lang'|'setAlertData'|'disableAlert'
    >
) => {
    setAlertData({
        enable: true,
        content: lang.MINT_EXCESS_TOTAL_SUPPLY,
        btnList: [
            {
                text: lang.I_WILL_ADJUST,
                onClick: disableAlert
            }
        ]
    });
};

export default enableExceedMaxSupplyAlert;