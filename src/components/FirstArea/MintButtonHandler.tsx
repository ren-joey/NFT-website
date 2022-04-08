import { useContext, useEffect } from "react";
import { useNativeBalance, useWeb3ExecuteFunction } from "react-moralis";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { ContractContext } from "src/Context/ContractContext";
import moralisConfig, { chainList } from "src/moralisConfig";
import MintButton from "../Shared/MintButton";
import { IAlertData } from "../Shared/SharedAlert";
import { MintMethodName } from "./MintBody";
import { mintAlertHandler } from "../Web3Service/mintHandlers/mintAlertHandler";
import { nullableBigNumber } from "src/interfaces/types";
import mintErrorHandler from "../Web3Service/functions/mintErrorHandler";

interface IProps {
    amount: number,
    remain: nullableBigNumber,
    mintMethodName: MintMethodName,
    alertData: IAlertData,
    setAlertData: (key: IAlertData) => void,
    buttonSize: React.CSSProperties
}

export interface INativeBalance {
    balance: string | undefined;
    formatted: string | null;
}

const MintButtonHandler = ({
    amount,
    remain,
    mintMethodName,
    alertData,
    setAlertData,
    buttonSize
}: IProps) => {
    const { data: nativeBalance }: { data: INativeBalance } = useNativeBalance({
        chain: moralisConfig.provider as chainList
    });

    const lang = useContext(LangContext);

    const { fetch, error } = useWeb3ExecuteFunction();

    const {
        getBalance,
        maxBalance,
        mintPrice,
        mintPriceEth
    } = useContext(ContractContext);

    const { status } = useContext(EventContext);

    const disableAlert = () => setAlertData({ enable: false, btnList: [], content: '' });

    useEffect(() => {
        if (error) {
            const regex = /error=([^;]*)(?=, method=)/g;
            const arr = error.message.match(regex);
            if (arr) {
                const errorObj = JSON.parse(arr[0].replace('error=', ''));
                mintErrorHandler(
                    errorObj,
                    lang,
                    maxBalance,
                    setAlertData,
                    disableAlert,
                    mintPriceEth
                );
            }
        }
    }, [error]);

    return (
        <MintButton
            text="Mint Now"
            onClick={() => {
                mintAlertHandler({
                    amount,
                    disableAlert,
                    fetch,
                    getBalance,
                    lang,
                    maxBalance,
                    mintMethodName,
                    mintPrice,
                    mintPriceEth,
                    nativeBalance,
                    remain,
                    setAlertData,
                    status
                });
            }}
            disable={
                remain === null // 尚未 fetch 完畢
                    || status === -1 // 活動尚未開始
                    || getBalance?.gte(maxBalance || 0) // 持有 nft 已達上限
                    || alertData.enable === true // 任意彈窗尚未處理完成
                    || remain.lte(0) ? true : undefined // 剩餘數量 <= 0
            }
            style={buttonSize}
        />
    );
};

export default MintButtonHandler;