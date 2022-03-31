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
import { getParameterByName } from "src/utils";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import GetContractVariable from "./ContractService/GetContractVariable";
import { nullableBigNumber } from "./interfaces";
import LoginService from "./UserService/LoginService";

const PermissionCertification = () => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3,
        account
    } = useMoralis();

    const {
        MAX_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        totalSupply,
        setIsSaleActive,
        setIsVipWhiteListSaleActive,
        setIsWhiteListSaleActive
    } = useContext(ContractContext);

    const {
        status,
        diff
    } = useContext(EventContext);

    const {
        fetch
    } = useWeb3ExecuteFunction();

    const _totalSupply = getParameterByName('totalSupply'); // [DEV]

    const remain = useMemo<nullableBigNumber>(() => {
        if (_totalSupply !== null) return BigNumber.from(_totalSupply);

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

    const fetchContractVariable = (
        paramName: string,
        params: any = undefined
    ) => new Promise<boolean>((resolve) => {
        let option = getWeb3ExecuteFunctionOption(paramName);
        if (params) option = { ...option, params };
        fetch({ params: option }).then((result) => {
            resolve(result as boolean);
        });
    });

    useEffect(() => {
        if (isWeb3Enabled === true) {
            EventBus.$emit('fetchMintPrice');
            EventBus.$emit('fetchMAX_SUPPLY');
            EventBus.$emit('fetchMAX_VIP_WHITE_LIST_SUPPLY');
            EventBus.$emit('fetchMAX_WHITE_LIST_SUPPLY');
            EventBus.$emit('fetchTotalSupply');
            EventBus.$emit('fetchMaxBalance');
            EventBus.$emit('fetchGetBalance');

            fetchContractVariable('_isVipWhiteListSaleActive').then((res) => {
                setIsVipWhiteListSaleActive(res);
            });
            fetchContractVariable('_isWhiteListSaleActive').then((res) => {
                setIsWhiteListSaleActive(res);
            });
            fetchContractVariable('_isSaleActive').then((res) => {
                setIsSaleActive(res);
            });
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

            <GetContractVariable methodName="mintPrice" />
            <GetContractVariable methodName="maxBalance" />
            <GetContractVariable methodName="totalSupply" />
            <GetContractVariable methodName="getBalance" />
            <GetContractVariable methodName="MAX_SUPPLY" />
            <GetContractVariable methodName="MAX_VIP_WHITE_LIST_SUPPLY" />
            <GetContractVariable methodName="MAX_WHITE_LIST_SUPPLY" />

            {/* mint 區塊 */}
            { mintArea() }

            {/* 時間及倒數區塊 */}
            { timeArea() }

            <SoldOutAlert />
        </>
    );
};

export default PermissionCertification;