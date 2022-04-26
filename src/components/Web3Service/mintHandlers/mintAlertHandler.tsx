import { Lang } from "src/lang";
import { IAlertData } from "../../Shared/SharedAlert";
import enableMintNotOpenAlert from "./enableMintNotOpenAlert";
import enableSoldOutAlert from "./enableSoldOutAlert";
import enableNotEnoughEth from "./enableNotEnoughEth";
import enableExceedAlert from "./enableExcessAlert";
import enableConfirmAlert from "./enableConfirmAlert";
import fetchMintBetamon from "./fetchMintBetamon";
import { MintMethodName, MoralisFetch } from "src/@types/contract";
import { Nullable, NullableBigNumber } from "src/@types/basicVariable";
import { INativeBalance } from "src/components/FirstArea/PurpleBlock/MintButtonHandler";

export interface IMintAlertHandler {
    setAlertData: (key: IAlertData) => void,
    disableAlert: () => void,
    status: number,
    supplyRemain: NullableBigNumber,
    amount: number,
    getBalance: NullableBigNumber,
    maxBalance: NullableBigNumber,
    mintPrice: NullableBigNumber,
    mintPriceEth: Nullable,
    nativeBalance: INativeBalance,
    mintMethodName: MintMethodName,
    fetch: MoralisFetch,
    lang: Lang
}

export const mintAlertHandler = ({
    fetch,
    mintMethodName,
    setAlertData,
    status,
    disableAlert,
    supplyRemain,
    amount,
    getBalance,
    maxBalance,
    mintPrice,
    mintPriceEth,
    nativeBalance,
    lang
}: IMintAlertHandler) => {
    const defaultParams = {
        disableAlert,
        lang,
        setAlertData
    };

    // 非 mint 期間
    if (status === -1 || status >= 3) enableMintNotOpenAlert(defaultParams);

    // 合約資料尚未 fetch 完成
    else if (getBalance === null
                        || maxBalance === null
                        || supplyRemain === null
                        || mintPrice === null) return;

    // 所有 NFT 於該階段已 mint 完畢
    else if (supplyRemain.lte(0)) enableSoldOutAlert(defaultParams);

    // 持有的 ETH 不足
    else if (nativeBalance.balance
                && mintPrice.mul(amount).gt(nativeBalance.balance)) {
        enableNotEnoughEth({
            ...defaultParams,
            maxBalance,
            mintPriceEth
        });

        // 持有的 NFT 超出上限
    } else if (getBalance.add(amount).gt(maxBalance)) {
        enableExceedAlert({
            ...defaultParams,
            maxBalance
        });

        // 白名單 MINT 期間
    } else if (status < 2) enableConfirmAlert({
        ...defaultParams,
        amount,
        maxBalance,
        fetch,
        mintMethodName,
        mintPrice
    });

    // 公售期間
    else if (status === 2) fetchMintBetamon({
        ...defaultParams,
        amount,
        mintMethodName,
        mintPrice,
        fetch
    });
};