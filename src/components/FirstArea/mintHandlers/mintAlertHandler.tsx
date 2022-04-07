import { Web3ExecuteFunctionParameters } from "react-moralis";
import { ResolveCallOptions } from "react-moralis/lib/hooks/internal/_useResolveAsyncCall";
import { Lang } from "src/lang";
import { nullable, nullableBigNumber } from "src/views/interfaces";
import { IAlertData } from "../../Shared/SharedAlert";
import { MintMethodName } from "../MintBody";
import { INativeBalance } from "../MintButtonHandler";
import enableConfirmAlert from "./enableConfirmAlert";
import enableExceedAlert from "./enableExceedAlert";
import enableMintNotOpenAlert from "./enableMintNotOpenAlert";
import enableNotEnoughEth from "./enableNotEnoughEth";
import enableSoldOutAlert from "./enableSoldOutAlert";
import fetchMintBetamon from "./fetchMintBetamon";

export interface IMintAlertHandler {
    setAlertData: (key: IAlertData) => void,
    disableAlert: () => void,
    status: number,
    remain: nullableBigNumber,
    amount: number,
    getBalance: nullableBigNumber,
    maxBalance: nullableBigNumber,
    mintPrice: nullableBigNumber,
    mintPriceEth: nullable,
    nativeBalance: INativeBalance,
    mintMethodName: MintMethodName,
    fetch: (key: ResolveCallOptions<
        unknown,
        Web3ExecuteFunctionParameters
    >) => Promise<unknown>,
    lang: Lang
}

export const mintAlertHandler = ({
    fetch,
    mintMethodName,
    setAlertData,
    status,
    disableAlert,
    remain,
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
                        || remain === null
                        || mintPrice === null) return;

    // 所有 NFT 於該階段已 mint 完畢
    else if (remain.lte(0)) enableSoldOutAlert(defaultParams);

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