import { BigNumber } from "ethers";
import React, { useContext, useEffect, useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import SoldOutAlert from "src/components/Shared/SoldOutAlert";
import { EventContext } from "src/Context/EventContext";
import { NullableBigNumber } from "src/@types/basicVariable";
import { ContractResponse, ContractVariables } from "src/@types/contract";
import { getParameterByName } from "src/utils";
import { ContractContext } from "../../Context/ContractContext";
import fetchContractVariable from "./functions/fetchContractVariable";
import { getContractContextBigNumSetter, getContractContextBooleanSetter } from "./functions/getContractContextSetter";
import LoginService from "./LoginService";
import TimeArea from "../FirstArea/PurpleBlock/TimeArea";
import BlockSwitcher from "../FirstArea/BlockSwitcher";
import deviceDetector from "src/functions/deviceDetector";
import NftBalance from "./NftBalance";
// import NftBalance from "./NftBalance";
// import NftCollection from "./NftCollection";
// import SharedAlert from "../Shared/SharedAlert";
// import NftTransfer from "./NftTransfer";
// import WalletConnection from "./WalletConnection";

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

    const { status } = useContext(EventContext);

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
                    } else if (res instanceof BigNumber) {
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
        if (isWeb3Enabled) {
            const paramName: ContractVariables = 'getBalance';
            fetchContractVariable<BigNumber | undefined>({
                paramName,
                fetch
            }).then((res) => {
                if (res instanceof BigNumber) {
                    const setter = getContractContextBigNumSetter({
                        contractContext,
                        paramName
                    });
                    setter(res);
                }
            });
        }
    }, [account]);

    useEffect(() => {
        if (isAuthenticated) enableWeb3(
            deviceDetector.device?.type !== 'desktop' ? {
                provider: 'walletconnect'
            } : {
                provider: 'metamask'
            }
        );
    }, [isAuthenticated]);

    return (
        <>
            {/* <UserBalance /> */}
            <LoginService />

            {/* mint 區塊 */}
            <BlockSwitcher remain={remain} />

            {/* 時間及倒數區塊 */}
            <TimeArea remain={remain} />

            {/* nft balance & metadata  */}
            {
                // [DEV]
                getParameterByName('transfer') && (
                    <NftBalance />
                )
            }

            {/* <SharedAlert
                btnList={[]}
                content={
                    <NftTransfer />
                }
                enable={true}
            /> */}

            {/* all nfts from contract */}
            {/* <NftCollection /> */}

            {/* VIP 白名單售罄彈窗 */}
            <SoldOutAlert />
        </>
    );
};

export default PermissionCertification;