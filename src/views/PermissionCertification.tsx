import React, { useContext, useEffect, useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import BetamonStage from "src/components/FirstArea/BetamonStage";
import MintBlock from "src/components/FirstArea/MintBlock";
import { blackTitle, whiteCard } from "src/components/ui/uiClassName";
import { EventContext } from "src/Context/EventContext";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import MaxBalance from "./ContractService/MaxBalance";
import MintBetamon from "./ContractService/MintBetamon";
import MintPrice from "./ContractService/MintPrice";
import NftDisplay from "./NftService/NftDisplay";
import LoginService from "./UserService/LoginService";
import UserBalance from "./UserService/UserBalance";

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
                return (
                    <MintBlock />
                );
            case 2:
                return (
                    <div>解盲了</div>
                );
            default:
                return false;
        }
    };

    return (
        <>
            {/* <UserBalance /> */}
            <LoginService />
            <MintPrice />
            <MaxBalance />
            {mintArea()}
        </>
    );
};

export default PermissionCertification;