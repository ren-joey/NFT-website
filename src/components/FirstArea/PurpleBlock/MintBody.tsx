import React, { useContext, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { ContractContext } from "src/Context/ContractContext";
import { getParameterByName, roundDecimal } from "src/utils";
import { NullableBigNumber } from "src/@types/basicVariable";
import { MintMethodName } from "src/@types/contract";
import SharedAlert, { IAlertData } from "src/components/Shared/SharedAlert";
import EthIcon from "src/components/Shared/EthIcon";
import MintButton from "src/components/Shared/MintButton";
import MintButtonHandler from "src/components/FirstArea/PurpleBlock/MintButtonHandler";
import LinkingAnimation from "src/components/FirstArea/PurpleBlock/LinkingAnimation";
import 'src/components/FirstArea/PurpleBlock/MintBody.scss';
import deviceDetector from "src/functions/deviceDetector";
import metamaskRedirect from "src/functions/metamaskRedirect";

interface IMintMethodName {
    remain: NullableBigNumber
    mintMethodName?: MintMethodName,
}

const MintBody = ({ remain, mintMethodName = 'mintBetamon' }: IMintMethodName) => {
    const {
        isAuthenticated,
        isWeb3Enabled
    } = useMoralis();

    const {
        getBalance,
        totalSupply,
        maxBalance,
        mintPriceEth
    } = useContext(ContractContext);

    const {
        status,
        device
    } = useContext(EventContext);

    const lang = useContext(LangContext);
    const [alertData, setAlertData] = useState<IAlertData>({
        enable: false,
        btnList: [],
        content: ''
    });

    const [amount, setAmount] = useState(1);
    const increaseAmount = () => {
        const max = Number(maxBalance);
        setAmount((amount + 1) % (max + 1) || max);
    };
    const decreaseAmount = () => setAmount((amount - 1) || 1);

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

    // 尚未連結錢包
    if (!isAuthenticated) {
        return (
            <div className="mint-body single">
                <div className="mint-title">
                    {lang.MINT_BODY_TITLE_1}
                    &nbsp;
                    <EthIcon size={device === 'desktop' ? '1.4rem' : '0.8rem'} />
                    &nbsp;
                    {lang.MINT_BODY_TITLE_2}
                </div>

                <MintButton
                    text={lang.LINK_WALLET}
                    style={buttonSize}
                    onClick={() => {
                        if (deviceDetector.device?.type !== 'desktop' && !getParameterByName('auto-login')) {
                            metamaskRedirect();
                        } else {
                            EventBus.$emit('fetchLogin');
                        }
                    }}
                />

                <LinkingAnimation />
            </div>
        );

    // 已連結錢包但 Web3.0 無法啟用，好發於錢包被自動登出
    } else if (isAuthenticated && !isWeb3Enabled) {
        return (
            <div className="mint-body single">
                <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                    {lang.CHECK_YOUR_WALLET}
                </div>
                <LinkingAnimation />
            </div>
        );

    // 解盲時段
    } else if (status === 3) {
        return (
            <div className="mint-body single">
                <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                    {lang.BLIND_BOX_OPENED}
                </div>
            </div>
        );

    // 其餘所有時段
    } else {
        return (
            <div className="mint-body left-push">
                <div className="body-left">
                    <div className="mint-amount">
                        <div className="plus" onClick={decreaseAmount}>-</div>
                        <div className="amount">{ amount }</div>
                        <div className="minus" onClick={increaseAmount}>+</div>
                    </div>

                    <div className="mint-status">
                        {lang.REMAIN}
                        {
                            (totalSupply === null || remain === null)
                                ? '--'
                                : remain.toString()
                        }
                    </div>
                    <div className="mint-status">
                        {lang.MAX_BALANCE}
                        {maxBalance === null ? '--' : maxBalance.toString()}
                    </div>
                    <div className="mint-status">
                        {lang.BALANCE}
                        {getBalance === null ? '--' : getBalance.toString()}
                    </div>
                </div>
                <div className="body-right">
                    <div className="total-price">
                        <EthIcon size={device === 'desktop' ? '2rem' : '1.4rem'} />
                        <div className="amount">
                            {roundDecimal(Number(mintPriceEth) * amount, 2)}
                        </div>
                        <div className="unit">ETH</div>
                    </div>

                    <MintButtonHandler
                        alertData={alertData}
                        setAlertData={setAlertData}
                        remain={remain}
                        amount={amount}
                        buttonSize={buttonSize}
                        mintMethodName={mintMethodName}
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

export default MintBody;