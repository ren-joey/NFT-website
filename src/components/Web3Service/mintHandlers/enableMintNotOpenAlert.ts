import { IMintAlertHandler } from "./mintAlertHandler";

const enableMintNotOpenAlert = ({
    setAlertData,
    disableAlert,
    lang
}: Pick<
    IMintAlertHandler,
    'setAlertData'|'lang'|'disableAlert'
    >
) => {
    setAlertData({
        enable: true,
        content: lang.MINT_NOT_OPEN,
        btnList: [
            {
                text: lang.I_WILL_EXPECT,
                onClick: disableAlert
            }
        ]
    });
};

export default enableMintNotOpenAlert;