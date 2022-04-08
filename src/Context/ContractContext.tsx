import { BigNumber } from "ethers";
import React from "react";
import { INft } from "src/interfaces/nft";
import { nullable, nullableBigNumber } from "src/interfaces/types";

export interface IContractData {
    getBalance: nullableBigNumber,
    setGetBalance: (num: BigNumber) => void;
    MAX_SUPPLY: nullableBigNumber;
    setMAX_SUPPLY: (num: BigNumber) => void;
    MAX_VIP_WHITE_LIST_SUPPLY: nullableBigNumber;
    setMAX_VIP_WHITE_LIST_SUPPLY: (num: BigNumber) => void;
    MAX_WHITE_LIST_SUPPLY: nullableBigNumber;
    setMAX_WHITE_LIST_SUPPLY: (num: BigNumber) => void;
    totalSupply: nullableBigNumber;
    setTotalSupply: (num: BigNumber) => void;
    mintPrice: nullableBigNumber;
    mintPriceEth: nullable,
    setMintPrice: (num: BigNumber) => void;
    maxBalance: nullableBigNumber;
    setMaxBalance: (num: BigNumber) => void
    nfts: INft[];
    setNfts: (nfts: INft[]) => void;
    isBlindBoxOpened: (undefined|boolean);
    setIsBlindBoxOpened: (bool: boolean) => void;
    isVipWhiteList: (undefined|boolean);
    setIsVipWhiteList: (bool: boolean) => void;
    isWhiteList: (undefined|boolean);
    setIsWhiteList: (bool: boolean) => void;
    isSaleActive: boolean;
    setIsSaleActive: (bool: boolean) => void;
    isWhiteListSaleActive: boolean;
    setIsWhiteListSaleActive: (bool: boolean) => void;
    isVipWhiteListSaleActive: boolean;
    setIsVipWhiteListSaleActive: (bool: boolean) => void;
    [key: string]: any;
}

const contractData: IContractData = {
    getBalance: null,
    setGetBalance: () => {},
    MAX_SUPPLY: null,
    setMAX_SUPPLY: () => {},
    MAX_VIP_WHITE_LIST_SUPPLY: null,
    setMAX_VIP_WHITE_LIST_SUPPLY: () => {},
    MAX_WHITE_LIST_SUPPLY: null,
    setMAX_WHITE_LIST_SUPPLY: () => {},
    totalSupply: null,
    setTotalSupply: () => {},
    mintPrice: null,
    setMintPrice: () => {},
    mintPriceEth: null,
    maxBalance: null,
    setMaxBalance: () => {},
    isBlindBoxOpened: undefined,
    setIsBlindBoxOpened: () => {},
    isVipWhiteList: undefined,
    setIsVipWhiteList: () => {},
    isWhiteList: undefined,
    setIsWhiteList: () => {},
    isSaleActive: false,
    setIsSaleActive: () => {},
    isWhiteListSaleActive: false,
    setIsWhiteListSaleActive: () =>{},
    isVipWhiteListSaleActive: false,
    setIsVipWhiteListSaleActive: () => {},
    nfts: [],
    setNfts: () => {}
};

const ContractContext = React.createContext({...contractData});

export {
    ContractContext,
    contractData
};