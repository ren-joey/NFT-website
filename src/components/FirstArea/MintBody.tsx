import { BigNumber } from "ethers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useNativeBalance, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import mintErrorHandler from "src/functions/mintErrorHandler";
import { getWeb3ExecuteFunctionOption } from "src/views/contractAbi";
import { ContractContext } from "src/views/ContractService/ContractContext";
import { nullableBigNumber } from "src/views/interfaces";
import EthIcon from "../Shared/EthIcon";
import MintButton from "../Shared/MintButton";
import SharedAlert, { IAlertData } from "../Shared/SharedAlert";
import LinkingAnimation from "./LinkingAnimation";
import 'src/components/FirstArea/MintBody.scss';
import { getParameterByName, roundDecimal } from "src/utils";
import hrefTo from "src/functions/hrefTo";
import { socialList } from "src/socialMediaConfig";
import moralisConfig, { chainList } from "src/views/moralisConfig";


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

    const { data: nativeBalance } = useNativeBalance({
        chain: moralisConfig.provider as chainList
    });

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
    const [prevId, setPrevId] = useState('');
    const [alertData, setAlertData] = useState<IAlertData>({
        enable: false,
        btnList: [],
        content: ''
    });

    const [amount, setAmount] = useState(1);
    const increaseAmount = () => setAmount((amount + 1) % (Number(maxBalance) + 1) || 3);
    const decreaseAmount = () => setAmount((amount - 1) || 1);

    const disableAlert = () => setAlertData({ enable: false, btnList: [], content: '' });

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

                setAlertData({
                    enable: true,
                    content: lang.MINTED_ALERT,
                    btnList: [
                        {
                            text: lang.MINTED_ALERT_BTN,
                            onClick: () => {
                                disableAlert();
                                window.open(`https://rinkeby.etherscan.io/tx/${result.hash}`, '_blank');
                            }
                        }
                    ]
                });
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

    const enableMintNotOpenAlert = () => {
        setAlertData({
            enable: true,
            content: lang.MINT_NOT_OPEN,
            btnList: [
                {
                    text: lang.I_WILL_EXPECT,
                    onClick: disableAlert
                }
            ]
        });
    };

    const enableSoldOutAlert = () => {
        setAlertData({
            enable: true,
            content: lang.MINT_SOLD_OUT,
            btnList: [
                {
                    text: lang.GO_TO_OPENSEA,
                    onClick: () => {
                        hrefTo(socialList[0]);
                        disableAlert();
                    }
                },
                {
                    text: lang.GO_TO_DISCORD,
                    onClick: () => {
                        hrefTo(socialList[1]);
                        disableAlert();
                    }
                }
            ]
        });
    };

    const enableExcessAlert = () => {
        if (maxBalance === null) return;
        setAlertData({
            enable: true,
            content: lang.MINT_EXCESS_ALERT.replace('${}', maxBalance.toString()),
            btnList: [
                {
                    text: lang.I_WILL_ADJUST,
                    onClick: disableAlert
                }
            ]
        });
    };

    const enableNotEnoughEth = () => {
        if (maxBalance === null || mintPriceEth === null) return;
        setAlertData({
            enable: true,
            content: lang.NOT_ENOUGH_ETH_ALERT.replace('${}', mintPriceEth.toString()),
            btnList: [
                {
                    text: lang.I_WILL_PREPARE_MORE_ETH,
                    onClick: disableAlert
                }
            ]
        });
    };

    const enableConfirmAlert = () => {
        if (amount === null || maxBalance === null) return;
        setAlertData({
            enable: true,
            content: lang.MINT_ALERT.replace('${}', amount.toString()).replace('${}', maxBalance.toString()),
            btnList: [
                {
                    text: lang.CANCEL,
                    type: 'gray',
                    onClick: disableAlert
                },
                {
                    text: lang.CONFIRM,
                    onClick: () => {
                        disableAlert();
                        fetchMintBetamon();
                    }
                }
            ]
        });
    };

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
                            <div className="amount">{
                                roundDecimal(Number(mintPriceEth) * amount, 2)
                            }</div>
                            <div className="unit">ETH</div>
                        </div>

                        <MintButton
                            text="Mint Now"
                            onClick={() => {
                                // 非 mint 期間
                                if (status === -1 || status >= 3) enableMintNotOpenAlert();

                                // 合約資料尚未 fetch 完成
                                else if (getBalance === null
                                    || maxBalance === null
                                    || remain === null
                                    || mintPrice === null) return;

                                // 所有 NFT 於該階段已 mint 完畢
                                else if (remain.lte(0)) enableSoldOutAlert();

                                // 持有的 ETH 不足
                                else if (nativeBalance.balance
                                    && mintPrice.mul(amount).gt(nativeBalance.balance)) {
                                    enableNotEnoughEth();

                                // 持有的 NFT 超出上限
                                } else if (getBalance.add(amount).gt(maxBalance)) {
                                    enableExcessAlert();

                                // 白名單 MINT 期間
                                } else if (status < 2) enableConfirmAlert();

                                // 公售期間
                                else if (status === 2) fetchMintBetamon();
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

                        <SharedAlert
                            enable={alertData.enable}
                            content={alertData.content}
                            btnList={alertData.btnList}
                        />

                        {
                            // [DEV]
                            getParameterByName('logout') && (
                                <button onClick={() => EventBus.$emit('fetchLogout')}>{lang.LOGOUT}</button>
                            )
                        }
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