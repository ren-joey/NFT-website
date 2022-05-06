import { useContext, useEffect } from "react";
import { useNativeBalance, useWeb3ExecuteFunction } from "react-moralis";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { ContractContext } from "src/Context/ContractContext";
import moralisConfig from "src/moralisConfig";
import { NullableBigNumber } from "src/@types/basicVariable";
import { ChainList, MintMethodName } from "src/@types/contract";
import { IAlertData } from "src/components/Shared/SharedAlert";
import mintErrorHandler from "src/components/Web3Service/functions/mintErrorHandler";
import { mintAlertHandler } from "src/components/Web3Service/mintHandlers/mintAlertHandler";
import MintButton from "src/components/Shared/Buttons/MintButton";

interface IProps {
    amount: number,
    supplyRemain: NullableBigNumber,
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
    supplyRemain,
    mintMethodName,
    alertData,
    setAlertData,
    buttonSize
}: IProps) => {
    const { data: nativeBalance }: { data: INativeBalance } = useNativeBalance({
        chain: moralisConfig.provider as ChainList
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
                    supplyRemain,
                    setAlertData,
                    status
                });
            }}
            disable={
                supplyRemain === null // 尚未 fetch 完畢
                    || status === -1 // 活動尚未開始
                    || getBalance?.gte(maxBalance || 0) // 持有 nft 已達上限
                    || alertData.enable === true // 任意彈窗尚未處理完成
                    || supplyRemain.lte(0) ? true : undefined // 剩餘數量 <= 0
            }
            style={buttonSize}
        />
    );
};

export default MintButtonHandler;