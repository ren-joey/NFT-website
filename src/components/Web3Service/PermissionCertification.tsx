import { BigNumber } from 'ethers';
import React, { useContext, useEffect } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { ContractResponse, ContractVariables } from 'src/@types/contract';
import { ContractContext } from '../../Context/ContractContext';
import fetchContractVariable from './functions/fetchContractVariable';
import { getContractContextBigNumSetter, getContractContextBooleanSetter } from './functions/getContractContextSetter';
import LoginService from './LoginService';
import RemainProvider from '../FirstArea/RemainProvider';
// import NftBalance from "./NftBalance";
// import NftCollection from "./NftCollection";
// import SharedAlert from "../Shared/SharedAlert";
// import NftTransfer from "./NftTransfer";
// import WalletConnection from "./WalletConnection";

const PermissionCertification = () => {
    const { isWeb3Enabled } = useMoralis();

    const contractContext = useContext(ContractContext);

    const {
        fetch
    } = useWeb3ExecuteFunction();

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
                    } else if (BigNumber.isBigNumber(res)) {
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

    return (
        <>
            {/* <UserBalance /> */}
            <LoginService />

            {/* Purple block & 時間及倒數區塊 */}
            <RemainProvider />

            {/* <SharedAlert
                btnList={[]}
                content={
                    <NftTransfer />
                }
                enable={true}
            /> */}

            {/* all nfts from contract */}
            {/* <NftCollection /> */}
        </>
    );
};

export default PermissionCertification;