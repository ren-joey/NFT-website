import { BigNumber } from "ethers";
import { useContext, useEffect } from "react";
import { useNativeBalance, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import mintErrorHandler from "src/functions/mintErrorHandler";
import { ContractContext } from "src/views/ContractService/ContractContext";
import { nullableBigNumber } from "src/views/interfaces";
import moralisConfig, { chainList } from "src/views/moralisConfig";
import MintButton from "../Shared/MintButton";
import { IAlertData } from "../Shared/SharedAlert";
import { MintMethodName } from "./MintBody";
import { mintAlertHandler } from "./mintHandlers/mintAlertHandler";

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
                const balance = maxBalance === null ? '--' : maxBalance.toString();
                const errorObj = JSON.parse(arr[0].replace('error=', ''));
                mintErrorHandler(errorObj, lang, balance, setAlertData, disableAlert, mintPriceEth);
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
                remain === null
                    || status === -1
                    || getBalance?.gte(maxBalance || 0)
                    || alertData.enable === true
                    || remain.lte(0) ? true : undefined
            }
            style={buttonSize}
        />
    );
};

export default MintButtonHandler;