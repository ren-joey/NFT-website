import { BigNumber } from "ethers";
import { rename } from "fs";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import mintErrorHandler from "src/functions/mintErrorHandler";
import { getWeb3ExecuteFunctionOption } from "src/views/contractAbi";
import { ContractContext } from "src/views/ContractService/ContractContext";
import MintPrice from "src/views/ContractService/MintPrice";
import { nullable, nullableBigNumber } from "src/views/interfaces";
import EthIcon from "../Shared/EthIcon";
import MintButton from "../Shared/MintButton";
import SharedAlert from "../Shared/SharedAlert";
import LinkingAnimation from "./LinkingAnimation";


export type MintMethodName = 'vipWhiteListMintBetamon'|'whiteListMintBetamon'|'mintBetamon';
interface IMintMethodName {
    remain: nullableBigNumber
    mintMethodName?: MintMethodName,
}

const MintBody = ({ remain, mintMethodName = 'mintBetamon' }: IMintMethodName) => {
    const {
        isAuthenticated,
        isWeb3Enabled
    } = useMoralis();

    const {
        fetch,
        error
    } = useWeb3ExecuteFunction();

    const {
        getBalance,
        totalSupply,
        maxBalance,
        mintPrice,
        mintPriceEth
    } = useContext(ContractContext);

    const {
        status,
        device
    } = useContext(EventContext);

    const lang = useContext(LangContext);

    const [alertState, setAlertState] = useState(false);
    const [confirmState, setConfirmState] = useState(false);
    const [content, setContent] = useState('');
    const [prevId, setPrevId] = useState('');

    const [amount, setAmount] = useState(1);
    const increaseAmount = () => setAmount((amount + 1) % (Number(maxBalance) + 1) || 3);
    const decreaseAmount = () => setAmount((amount - 1) || 1);

    const fetchMintBetamon = () => new Promise<void>((res) => {
        const doFetch = async (price: nullableBigNumber = mintPrice) => {
            const mintBetamonOptions = getWeb3ExecuteFunctionOption(mintMethodName);

            const result: any = await fetch({
                params: {
                    ...mintBetamonOptions,
                    msgValue: price === null || price.isZero() ? 0 : price.mul(amount).toString(),
                    params: {
                        numBetamon: amount
                    }
                }
            });

            if (result !== undefined) {
                setPrevId(result.hash);

                setContent(lang.MINTED_ALERT);
                setAlertState(true);
            }

            res();
        };

        if (!mintPrice) {
            EventBus.$emit(`fetchMintPrice`).then((price: BigNumber) => {
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
                const balance = maxBalance === null ? '--' : maxBalance.toString();
                const errorObj = JSON.parse(arr[0].replace('error=', ''));
                mintErrorHandler(errorObj, lang, balance);
            }
        }
    }, [error]);

    const buttonSize = useMemo<React.CSSProperties>(() => {
        if (device === 'desktop') {
            return { margin: '2rem 0 1rem', whiteSpace: 'nowrap' };
        }
        return {
            margin: '1rem 0 0.6rem',
            padding: '0.6rem 1.4rem',
            fontSize: '1.4rem',
            whiteSpace: 'nowrap'
        };
    }, [device]);

    const mintBody = () => {
        if (!isAuthenticated) {
            return (
                <div className="mint-body single">
                    <div className="mint-title">
                        {lang.MINT_BODY_TITLE_1} <EthIcon size={device === 'desktop' ? '1.4rem' : '0.8rem'} /> {lang.MINT_BODY_TITLE_2}
                    </div>

                    <MintButton
                        text={lang.LINK_WALLET}
                        style={buttonSize}
                        onClick={() => EventBus.$emit('fetchLogin')}
                    />

                    <LinkingAnimation />
                </div>);
        } else if (isAuthenticated && !isWeb3Enabled) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        {lang.CHECK_YOUR_WALLET}
                    </div>
                    <LinkingAnimation />
                </div>);
        } else if (status === 3) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        {lang.BLIND_BOX_OPENED}
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

                        <div className="mint-status">
                            {lang.REMAIN}{totalSupply === null || remain === null ? '--' : remain.toString()}
                        </div>
                        <div className="mint-status">{lang.MAX_BALANCE}{maxBalance === null ? '--' : maxBalance.toString()}</div>
                        <div className="mint-status">
                            {lang.BALANCE}{getBalance === null ? '--' : getBalance.toString()}
                        </div>
                    </div>
                    <div className="body-right">
                        <div className="total-price">
                            <EthIcon size={device === 'desktop' ? '2rem' : '1.4rem'} />
                            <div className="amount">{Number(mintPriceEth) * amount}</div>
                            <div className="unit">ETH</div>
                        </div>

                        <MintButton
                            text="Mint Now"
                            onClick={() => {
                                if (status < 2) setConfirmState(true);
                                else fetchMintBetamon();
                            }}
                            disable={
                                remain === null
                                || status === -1
                                || getBalance?.gte(maxBalance || 0)
                                || confirmState === true
                                || remain.lte(0) ? true : undefined
                            }
                            style={buttonSize}
                        />

                        <SharedAlert
                            enable={confirmState}
                            content={lang.MINT_ALERT.replace('${}', Number(amount).toString()).replace('${}', Number(maxBalance).toString())}
                            confirmText={lang.CONFIRM}
                            onConfirm={() => {
                                setConfirmState(false);
                                fetchMintBetamon();
                            }}
                            cancelText={lang.CANCEL}
                            onCancel={() => {
                                setConfirmState(false);
                            }} />

                        <SharedAlert enable={alertState} content={content}
                            confirmText={lang.CONFIRM}
                            onConfirm={() => {
                                setAlertState(false);
                                window.open(`https://rinkeby.etherscan.io/tx/${prevId}`, '_blank');
                            }}
                            cancelText={lang.CANCEL}
                            onCancel={() => {
                                setAlertState(false);
                            }}
                        />

                        {/* <button onClick={() => EventBus.$emit('fetchLogout')}>lang.LOGOUT</button> */}
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