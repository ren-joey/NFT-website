import { useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import mintErrorHandler from "src/functions/mintErrorHandler";
import { getWeb3ExecuteFunctionOption } from "src/views/contractAbi";
import { ContractContext } from "src/views/ContractService/ContractContext";
import MintPrice from "src/views/ContractService/MintPrice";
import { nullable } from "src/views/interfaces";
import EthIcon from "../Shared/EthIcon";
import MintButton from "../Shared/MintButton";
import LinkingAnimation from "./LinkingAnimation";


export type MintMethodName = 'vipWhiteListMintBetamon'|'whiteListMintBetamon'|'mintBetamon';
interface IMintMethodName {
    mintMethodName?: MintMethodName
}

const MintBody = ({ mintMethodName = 'mintBetamon' }: IMintMethodName = {}) => {
    const {
        isAuthenticated,
        isWeb3Enabled
    } = useMoralis();

    const {
        fetch,
        error
    } = useWeb3ExecuteFunction();

    const {
        MAX_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        totalSupply,
        maxBalance,
        mintPrice,
        mintPriceEth
    } = useContext(ContractContext);

    const {
        status
    } = useContext(EventContext);

    const [amount, setAmount] = useState(1);
    const increaseAmount = () => setAmount((amount + 1) % (Number(maxBalance ) + 1) || 3);
    const decreaseAmount = () => setAmount((amount - 1) || 1);
    const remain = useMemo(() => {
        switch (status) {
            case 0:
                return Number(MAX_VIP_WHITE_LIST_SUPPLY) - Number(totalSupply);
            case 1:
                return Number(MAX_WHITE_LIST_SUPPLY) - Number(totalSupply);
            case 2:
            case 3:
                return Number(MAX_SUPPLY) - Number(totalSupply);
            default:
                return 0;
        }
    }, [
        MAX_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        totalSupply
    ]);

    const fetchMintBetamon = () => new Promise<void>((res) => {
        const doFetch = async (price = mintPrice) => {
            const mintBetamonOptions = getWeb3ExecuteFunctionOption(mintMethodName);

            await fetch({
                params: {
                    ...mintBetamonOptions,
                    msgValue: amount * (price || 0),
                    params: {
                        numBetamon: amount
                    }
                }
            });

            res();
        };

        if (!mintPrice) {
            EventBus.$emit(`fetchMintPrice`).then((price: number) => {
                doFetch(price);
            });
        } else {
            doFetch();
        }
    });

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

    const mintBody = () => {
        if (!isAuthenticated) {
            return (
                <div className="mint-body single">
                    <div className="mint-title">
                        支付 <EthIcon size="1.4rem" /> 0.1 ETH 即可招喚 B 星人
                    </div>

                    <MintButton
                        text="連結錢包"
                        style={{ margin: '2rem 0 1rem' }}
                        onClick={() => EventBus.$emit('fetchLogin')}
                    />

                    <LinkingAnimation />
                </div>);
        } else if (isAuthenticated && !isWeb3Enabled) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        請檢查您的錢包連線狀態
                    </div>
                    <LinkingAnimation />
                </div>);
        } else if (status === 3) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        β星人已全面解盲
                    </div>
                </div>);
        } else {
            return (
                <div className="mint-body left-push">
                    <div className="body-left">
                        <div className="mint-amount">
                            <div className="plus" onClick={() => decreaseAmount()}>-</div>
                            <div className="amount">{ amount }</div>
                            <div className="minus" onClick={() => increaseAmount()}>+</div>
                        </div>
                        <div className="mint-remain">剩餘數量：{remain}</div>
                        <div className="mint-balance">限購數量：{maxBalance}</div>
                    </div>
                    <div className="body-right">
                        <div className="total-price">
                            <EthIcon size="2rem" />
                            <div className="amount">{Number(mintPriceEth) * amount}</div>
                            <div className="unit">ETH</div>
                        </div>

                        <MintButton
                            text="Mint Now"
                            onClick={() => fetchMintBetamon() }
                            style={{ marginTop: '1rem' }}
                        />

                        {/* <button onClick={() => EventBus.$emit('fetchLogout')}>登出</button> */}
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {mintBody()}
        </>
    );
};

export default MintBody;