import { BigNumber } from "ethers";
import { IContractData } from "src/Context/ContractContext";
import { ContractVariables } from "src/@types/contract";

interface IProps {
    paramName: ContractVariables;
    contractContext: IContractData;
}

export const getContractContextBigNumSetter = ({
    paramName,
    contractContext
}: IProps): (key: BigNumber) => void => {
    switch(paramName) {
        case 'mintPrice':
            return contractContext.setMintPrice;
        case 'maxBalance':
            return contractContext.setMaxBalance;
        case 'totalSupply':
            return contractContext.setTotalSupply;
        case 'getBalance':
            return contractContext.setGetBalance;
        case 'MAX_SUPPLY':
            return contractContext.setMAX_SUPPLY;
        case 'MAX_VIP_WHITE_LIST_SUPPLY':
            return contractContext.setMAX_VIP_WHITE_LIST_SUPPLY;
        case 'MAX_WHITE_LIST_SUPPLY':
            return contractContext.setMAX_WHITE_LIST_SUPPLY;
        default:
            return () => {};
    }
};

export const getContractContextBooleanSetter = ({
    paramName,
    contractContext
}: IProps): (key: boolean) => void => {
    switch(paramName) {
        case '_isVipWhiteListSaleActive':
            return contractContext.setIsVipWhiteListSaleActive;
        case '_isWhiteListSaleActive':
            return contractContext.setIsWhiteListSaleActive;
        case '_isSaleActive':
            return contractContext.setIsSaleActive;
        default:
            return () => {};
    }
};
