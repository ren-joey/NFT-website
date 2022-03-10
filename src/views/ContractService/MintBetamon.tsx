import { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { blackDescription, blackTitle, cyanBtn, cyanBtnDisabled, flexCenter, whiteCard } from "src/components/ui/uiClassName";
import mintErrorHandler from "src/functions/mintErrorHandler";
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from "./ContractContext";

type MintMethodName = 'vipWhiteListMintBetamon'|'whiteListMintBetamon'|'mintBetamon';
interface IMintMethodName {
    mintMethodName?: MintMethodName
}

const MintBetamon = ({ mintMethodName = 'mintBetamon' }: IMintMethodName = {}) => {
    const {
        isAuthenticated
    } = useMoralis();
    const {
        fetch,
        isFetching,
        error
    } = useWeb3ExecuteFunction();
    const {
        mintPrice,
        mintPriceEth,
        maxBalance
    } = useContext(ContractContext);
    const [amount, setAmount] = useState(1);
    const increasingAmount = () => setAmount((amount + 1) % 4 || 1);
    const decreasingAmount = () => setAmount(amount - 1 || 1);

    const fetchMintBetamon = () => {
        const doFetch = (price = mintPrice) => {
            const mintBetamonOptions = getWeb3ExecuteFunctionOption(mintMethodName);

            fetch({
                params: {
                    ...mintBetamonOptions,
                    msgValue: amount * (price || 0),
                    params: {
                        numBetamon: amount
                    }
                }
            });
        };

        if (!mintPrice) {
            EventBus.$emit(`fetchMintPrice`).then((price: number) => {
                doFetch(price);
            });
        } else {
            doFetch();
        }
    };

    useEffect(() => {
        if (error) {
            const regex = /error=([^;]*)(?=, method=)/g;
            const arr = error.message.match(regex);
            if (arr) {
                const errorObj = JSON.parse(arr[0].replace('error=', ''));
                mintErrorHandler(errorObj);
            }
        }
    }, [error]);

    const boxStyle_sm = /* @TW */ 'w-6 h-6 mx-1 rounded text-white cursor-pointer';
    const boxStyle_lg = /* @TW */ 'w-10 h-10 mx-1 rounded text-white font-bold text-lg cursor-pointer';

    return (
        <div>
            {
                isAuthenticated && (
                    <div className={`flex-col ${whiteCard}`}>
                        <div className={blackDescription}>
                            {`每人持有上限：${maxBalance} ETH`}
                        </div>

                        <div className={blackDescription}>
                            {`目前 MINT 價格：${mintPriceEth} ETH`}
                        </div>

                        <div className={blackTitle}>
                            {`總價： ${Number(mintPriceEth) * amount} ETH`}
                        </div>

                        <div className="flex items-center justify-center mb-2">
                            <div
                                className={`${boxStyle_sm} ${flexCenter} bg-red-500`}
                                onClick={() => decreasingAmount()}
                            >
                                -
                            </div>
                            <div className={`${boxStyle_lg} ${flexCenter} bg-cyan-500`}>
                                { amount }
                            </div>
                            <div
                                className={`${boxStyle_sm} ${flexCenter} bg-green-500`}
                                onClick={() => increasingAmount()}
                            >
                                +
                            </div>
                        </div>
                        <div>
                            <button
                                className={isFetching ? cyanBtnDisabled : cyanBtn}
                                onClick={() => fetchMintBetamon()}
                                disabled={isFetching}
                            >
                                MINT NOW!
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MintBetamon;