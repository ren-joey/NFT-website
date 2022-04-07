import enableExceedMaxSupplyAlert from "src/components/FirstArea/mintHandlers/enableExceedMaxSupplyAlert";
import enableMintNotOpenAlert from "src/components/FirstArea/mintHandlers/enableMintNotOpenAlert";
import enableNotEnoughEth from "src/components/FirstArea/mintHandlers/enableNotEnoughEth";
import enableNotInWhiteList from "src/components/FirstArea/mintHandlers/enableNotInWhiteList";
import { IAlertData } from "src/components/Shared/SharedAlert";
import { Lang } from "src/lang";
import { nullable, nullableBigNumber } from "src/views/interfaces";

interface IErrorMsgObj {
    message: string,
    [key: string]: any
}

const mintErrorHandler = (
    error: IErrorMsgObj,
    lang: Lang,
    maxBalance: nullableBigNumber,
    setAlertData: (key: IAlertData) => void,
    disableAlert: () => void,
    mintPriceEth: nullable
) => {
    const defaultParams = { setAlertData, disableAlert, lang };
    if (error.message.includes('Sale must be active to mint Betamon')) {
        enableMintNotOpenAlert(defaultParams);
    } else if (error.message.includes('Sale would exceed max supply')) {
        enableExceedMaxSupplyAlert({
            disableAlert,
            lang,
            setAlertData
        });
    } else if (error.message.includes('Sale would exceed max balance')
        || error.message.includes('Sale would exceed max mint')) {
        enableExceedMaxSupplyAlert(defaultParams);
    } else if (error.message.includes('Not enough ether sent')) {
        enableNotEnoughEth({
            ...defaultParams,
            maxBalance,
            mintPriceEth
        });
    } else if (
        error.message.includes('Not in vip white list')
        || error.message.includes('Not in white list')
    ) {
        enableNotInWhiteList(defaultParams);
    }

    return null;
};

export default mintErrorHandler;