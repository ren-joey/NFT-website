import React, { useContext, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { EventBus } from 'src/bus';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import { ContractContext } from 'src/Context/ContractContext';
import { getParameterByName, roundDecimal } from 'src/utils';
import { NullableBigNumber } from 'src/@types/basicVariable';
import { MintMethodName } from 'src/@types/contract';
import EthIcon from 'src/components/Shared/Buttons/EthIcon';
import MintButtonHandler from 'src/components/FirstArea/PurpleBlock/MintButtonHandler';
import LinkingAnimation from 'src/components/FirstArea/PurpleBlock/LinkingAnimation';
import NftTransfer from 'src/components/Web3Service/NftTransfer';
import SharedLoginButton from 'src/components/Shared/Buttons/SharedLoginButton';

interface IMintMethodName {
    supplyRemain: NullableBigNumber
    mintMethodName?: MintMethodName,
}

const MintBody = ({ supplyRemain, mintMethodName = 'mintBetamon' }: IMintMethodName) => {
    const {
        isAuthenticated,
        isWeb3Enabled
    } = useMoralis();

    const {
        MAX_SUPPLY,
        getBalance,
        totalSupply,
        maxBalance,
        mintPriceEth
    } = useContext(ContractContext);

    const {
        buttonSize,
        device
    } = useContext(EventContext);

    const lang = useContext(LangContext);

    const [amount, setAmount] = useState(1);
    const increaseAmount = () => {
        let nextAmount = amount + 1;
        if (nextAmount >= 99) nextAmount = 99;
        setAmount(nextAmount);
    };
    const decreaseAmount = () => {
        let nextAmount = amount - 1;
        if (nextAmount <= 1) nextAmount = 1;
        setAmount(nextAmount);
    };

    // 尚未連結錢包
    if (!isAuthenticated || !isWeb3Enabled) {
        return (
            <div className="mint-body single">
                <div className="mint-title">
                    {lang.MINT_BODY_TITLE_1}
                    &nbsp;
                    <EthIcon size={device === 'desktop' ? '1.4rem' : '0.8rem'} />
                    &nbsp;
                    {lang.MINT_BODY_TITLE_2}
                </div>

                <SharedLoginButton />
                <LinkingAnimation />
            </div>
        );

    // 其餘所有時段
    } else {
        return (
            <div className="mint-body left-push">
                <div className="body-left">
                    <div className="mint-amount">
                        <div
                            className="plus"
                            onClick={decreaseAmount}
                        >-
                        </div>
                        <div className="amount">{ amount }</div>
                        <div
                            className="minus"
                            onClick={increaseAmount}
                        >+
                        </div>
                    </div>

                    <div className="mint-status">
                        {lang.REMAIN}
                        {
                            (totalSupply === null || supplyRemain === null)
                                ? '--'
                                : supplyRemain.toString()
                        }
                    </div>
                    <div className="mint-status">
                        {lang.MAX_BALANCE}
                        {maxBalance === null
                            ? '--'
                            : MAX_SUPPLY !== null && maxBalance.eq(MAX_SUPPLY)
                                ? '∞'
                                : maxBalance.toString()}
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
                        supplyRemain={supplyRemain}
                        amount={amount}
                        buttonSize={buttonSize}
                        mintMethodName={mintMethodName}
                    />

                    {
                        // [DEV]
                        getParameterByName('logout') && (
                            <button onClick={() => EventBus.$emit('fetchLogout')}>{lang.LOGOUT}</button>
                        )
                    }

                    {
                        // [DEV]
                        getParameterByName('transfer') && (
                            <NftTransfer />
                        )
                    }
                </div>
            </div>
        );
    }
};

export default MintBody;