import React from "react";
import { IContractData } from "../interfaces";

const contractData: IContractData = {
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