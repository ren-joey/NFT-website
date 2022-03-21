import React from "react";
import { IContractData } from "../interfaces";

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