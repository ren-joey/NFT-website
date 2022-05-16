import { Nullable, NullableBigNumber } from "src/@types/basicVariable";
import { AlertData } from "src/@types/viewVariables";
import { Lang } from "src/lang";
import enableExceedMaxSupplyAlert from "../mintHandlers/enableExceedMaxSupplyAlert";
import enableMintNotOpenAlert from "../mintHandlers/enableMintNotOpenAlert";
import enableNotEnoughEth from "../mintHandlers/enableNotEnoughEth";
import enableNotInWhiteList from "../mintHandlers/enableNotInWhiteList";

interface IErrorMsgObj {
    message: string,
    [key: string]: any
}

const mintErrorHandler = (
    error: IErrorMsgObj,
    lang: Lang,
    maxBalance: NullableBigNumber,
    mintPriceEth: Nullable
) => {
    const defaultParams = { lang };
    if (error.message.includes('Sale must be active to mint Betamon')) {
        enableMintNotOpenAlert(defaultParams);
    } else if (error.message.includes('Sale would exceed max supply')) {
        enableExceedMaxSupplyAlert(defaultParams);
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