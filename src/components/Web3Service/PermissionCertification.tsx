import { BigNumber } from "ethers";
import React, { useContext, useEffect, useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import BetamonStage from "src/components/FirstArea/BetamonStage";
import Counter from "src/components/FirstArea/Counter";
import MintBlock from "src/components/FirstArea/MintBlock";
import RevealTime from "src/components/FirstArea/RevealTime";
import SoldOutAlert from "src/components/Shared/SoldOutAlert";
import { EventContext } from "src/Context/EventContext";
import { NullableBigNumber } from "src/@types/basicVariable";
import { ContractResponse, ContractVariables } from "src/@types/contract";
import { getParameterByName } from "src/utils";
import { ContractContext } from "../../Context/ContractContext";
import fetchContractVariable from "./functions/fetchContractVariable";
import { getContractContextBigNumSetter, getContractContextBooleanSetter } from "./functions/getContractContextSetter";
import LoginService from "./LoginService";
import SharedAlert from "../Shared/SharedAlert";
import NftCollection from "./NftCollection";

const PermissionCertification = () => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3,
        account
    } = useMoralis();

    const contractContext = useContext(ContractContext);
    const {
        MAX_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        totalSupply
    } = contractContext;

    const {
        status,
        diff
    } = useContext(EventContext);

    const {
        fetch
    } = useWeb3ExecuteFunction();

    const _totalSupply = getParameterByName('totalSupply'); // [DEV]

    const remain = useMemo<NullableBigNumber>(() => {
        if (_totalSupply) return BigNumber.from(_totalSupply);

        if (totalSupply === null
            || MAX_VIP_WHITE_LIST_SUPPLY === null
            || MAX_WHITE_LIST_SUPPLY === null
            || MAX_SUPPLY === null) return null;

        let _remain = BigNumber.from(0);
        switch (status) {
            case -1:
            case 0:
                _remain = MAX_VIP_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 1:
                _remain = MAX_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 2:
            case 3:
                _remain = MAX_SUPPLY.sub(totalSupply);
                break;
            default:
                _remain = BigNumber.from(0);
        }
        return _remain.lt(0) ? BigNumber.from(0) : _remain;
    }, [
        MAX_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        totalSupply,
        status
    ]);

    useEffect(() => {
        if (isWeb3Enabled === true) {
            const paramNamesReturnBigNum: ContractVariables[] = [
                'mintPrice',
                'maxBalance',
                'totalSupply',
                'getBalance',
                'MAX_SUPPLY',
                'MAX_VIP_WHITE_LIST_SUPPLY',
                'MAX_WHITE_LIST_SUPPLY',
                '_isVipWhiteListSaleActive',
                '_isWhiteListSaleActive',
                '_isSaleActive'
            ];

            for (let i = 0; i < paramNamesReturnBigNum.length; i++) {
                const paramName = paramNamesReturnBigNum[i];
                fetchContractVariable<ContractResponse>({
                    paramName,
                    fetch
                }).then((res) => {
                    if (res === undefined) return;
                    if (typeof res === 'boolean') {
                        const setter = getContractContextBooleanSetter({
                            contractContext,
                            paramName
                        });
                        setter(res);
                    } else {
                        const setter = getContractContextBigNumSetter({
                            contractContext,
                            paramName
                        });
                        setter(res);
                    }
                });
            }
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (isWeb3Enabled) EventBus.$emit('fetchGetBalance');
    }, [account]);

    useEffect(() => {
        if (isAuthenticated) enableWeb3();
    }, [isAuthenticated]);

    const mintArea = () => {
        switch(status) {
            case -1:
                if (diff > 604800000) {
                    return (
                        <BetamonStage />
                    );
                }
                return (
                    <MintBlock remain={remain} />
                );
            case 0:
            case 1:
            case 2:
            case 3:
                return (
                    <MintBlock remain={remain} />
                );
            default:
                return false;
        }
    };

    const timeArea = () => {
        switch(status) {
            case -1:
            case 3:
                return (
                    <>
                        <RevealTime />
                        <Counter />
                    </>
                );
            case 0:
            case 1:
                return null;
            case 2:
                return (remain?.isZero()) && (
                    <>
                        <RevealTime />
                        <Counter />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* <UserBalance /> */}
            <LoginService />

            {/* mint 區塊 */}
            { mintArea() }

            {/* 時間及倒數區塊 */}
            { timeArea() }

            {/* nft metadata 區塊 */}
            <SharedAlert
                btnList={[]}
                content={<NftCollection />}
                enable={true}
            />

            {/* <SoldOutAlert /> [DEV] */}
        </>
    );
};

export default PermissionCertification;