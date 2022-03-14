import React, { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import BetamonStage from "src/components/FirstArea/BetamonStage";
import MintBlock from "src/components/FirstArea/MintBlock";
import { EventContext } from "src/Context/EventContext";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import GetContractVariable from "./ContractService/GetContractVariable";
import MaxBalance from "./ContractService/MaxBalance";
import MintPrice from "./ContractService/MintPrice";
import LoginService from "./UserService/LoginService";

const PermissionCertification = () => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3
    } = useMoralis();

    const {
        setIsSaleActive,
        setIsVipWhiteListSaleActive,
        setIsWhiteListSaleActive
    } = useContext(ContractContext);

    const {
        fetch
    } = useWeb3ExecuteFunction();

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
            EventBus.$emit('fetchMAX_SUPPLY');
            EventBus.$emit('fetchMAX_VIP_WHITE_LIST_SUPPLY');
            EventBus.$emit('fetchMAX_WHITE_LIST_SUPPLY');
            EventBus.$emit('fetchTotalSupply');
            EventBus.$emit('fetchMintPrice');
            EventBus.$emit('fetchMaxBalance');

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
        if (isAuthenticated) enableWeb3();
    }, [isAuthenticated]);

    const { status } = useContext(EventContext);

    const mintArea = () => {
        switch(status) {
            case -1:
                return (
                    <BetamonStage />
                );
            case 0:
            case 1:
            case 2:
            case 3:
                return (
                    <MintBlock />
                );
            default:
                return false;
        }
    };

    return (
        <>
            {/* <UserBalance /> */}
            <LoginService />

            <GetContractVariable methodName="mintPrice" />
            <GetContractVariable methodName="maxBalance" />
            <GetContractVariable methodName="totalSupply" />
            <GetContractVariable methodName="MAX_SUPPLY" />
            <GetContractVariable methodName="MAX_VIP_WHITE_LIST_SUPPLY" />
            <GetContractVariable methodName="MAX_WHITE_LIST_SUPPLY" />
            {mintArea()}
        </>
    );
};

export default PermissionCertification;