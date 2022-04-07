import React, { useContext, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { EventBus } from "src/bus";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import { ContractContext } from "src/views/ContractService/ContractContext";
import { nullableBigNumber } from "src/views/interfaces";
import EthIcon from "../Shared/EthIcon";
import MintButton from "../Shared/MintButton";
import SharedAlert, { IAlertData } from "../Shared/SharedAlert";
import LinkingAnimation from "./LinkingAnimation";
import 'src/components/FirstArea/MintBody.scss';
import { getParameterByName, roundDecimal } from "src/utils";
import MintButtonHandler from "./MintButtonHandler";


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
    const increaseAmount = () => setAmount((amount + 1) % (Number(maxBalance) + 1) || 3);
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

    const mintBody = () => {
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
                        onClick={() => EventBus.$emit('fetchLogin')}
                    />

                    <LinkingAnimation />
                </div>
            );
        } else if (isAuthenticated && !isWeb3Enabled) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        {lang.CHECK_YOUR_WALLET}
                    </div>
                    <LinkingAnimation />
                </div>
            );
        } else if (status === 3) {
            return (
                <div className="mint-body single">
                    <div className="mint-title" style={{ margin: '2rem 0 1rem' }}>
                        {lang.BLIND_BOX_OPENED}
                    </div>
                </div>
            );
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

    return (
        <>
            {mintBody()}
        </>
    );
};

export default MintBody;