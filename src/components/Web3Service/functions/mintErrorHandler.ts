import { IAlertData } from "src/components/Shared/SharedAlert";
import { nullable } from "src/interfaces/types";
import { Lang } from "src/lang";

interface IErrorMsgObj {
    message: string,
    [key: string]: any
}

const mintErrorHandler = (
    error: IErrorMsgObj,
    lang: Lang,
    maxBalance: string,
    setAlertData: (key: IAlertData) => void,
    disableAlert: () => void,
    mintPriceEth: nullable
) => {
    if (error.message.includes('Sale must be active to mint Betamon')) {
        // alert(lang.MINT_ALERT_NOT_ACTIVE);
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
    } else if (error.message.includes('Sale would exceed max supply')) {
        // alert(lang.MINT_ALERT_EXCEED_MAX_SUPPLY);
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
    } else if (error.message.includes('Sale would exceed max balance')
        || error.message.includes('Sale would exceed max mint')) {
        // alert(lang.MINT_ALERT_EXCEED_MAX_BALANCE.replace('${}', maxBalance));
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
    } else if (error.message.includes('Not enough ether sent')) {
        // alert(lang.NOT_ENOUGH_ETH);
        if (mintPriceEth === null) mintPriceEth = 0.1;
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
    } else if (
        error.message.includes('Not in vip white list')
        || error.message.includes('Not in white list')
    ) {
        setAlertData({
            enable: true,
            content: lang.NOT_INT_WHITE_LIST,
            btnList: [
                {
                    text: lang.I_WILL_WAIT_MORE,
                    onClick: disableAlert
                }
            ]
        });
    }

    return null;
};

export default mintErrorHandler;