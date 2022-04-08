import hrefTo from "src/functions/hrefTo";
import { socialList } from "src/socialMediaConfig";
import { IMintAlertHandler } from "./mintAlertHandler";

const enableSoldOutAlert = ({
    setAlertData,
    lang,
    disableAlert
}: Pick<
    IMintAlertHandler,
    'setAlertData'|'lang'|'disableAlert'
    >
) => {
    setAlertData({
        enable: true,
        content: lang.MINT_SOLD_OUT,
        btnList: [
            {
                text: lang.GO_TO_OPENSEA,
                onClick: () => {
                    hrefTo(socialList[0]);
                    disableAlert();
                }
            },
            {
                text: lang.GO_TO_DISCORD,
                onClick: () => {
                    hrefTo(socialList[1]);
                    disableAlert();
                }
            }
        ]
    });
};

export default enableSoldOutAlert;