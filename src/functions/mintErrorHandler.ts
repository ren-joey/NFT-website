import { Lang } from "src/lang";

interface IErrorMsgObj {
    message: string,
    [key: string]: any
}

const mintErrorHandler = (error: IErrorMsgObj, lang: Lang, maxBalance: string) => {
    if (error.message.includes('Sale must be active to mint Betamon')) {
        alert(lang.MINT_ALERT_NOT_ACTIVE);
    } else if (error.message.includes('Sale would exceed max supply')) {
        alert(lang.MINT_ALERT_EXCEED_MAX_SUPPLY);
    } else if (error.message.includes('Sale would exceed max balance')
        || error.message.includes('Sale would exceed max mint')) {
        alert(lang.MINT_ALERT_EXCEED_MAX_BALANCE.replace('${}', maxBalance));
    } else if (error.message.includes('Not enough ether sent')) {
        alert(lang.NOT_ENOUGH_ETH);
    } else if (
        error.message.includes('Not in vip white list')
        || error.message.includes('Not in white list')
    ) {
        alert(lang.NOT_IN_LIST);
    }

    return null;
};

export default mintErrorHandler;