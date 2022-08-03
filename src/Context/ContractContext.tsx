import { BigNumber } from 'ethers';
import React from 'react';
import { BasicNft, INft } from 'src/@types/nft';
import { Nullable, NullableBigNumber } from 'src/@types/basicVariable';

export interface IContractData {
    getBalance: NullableBigNumber,
    setGetBalance: (num: BigNumber) => void;
    MAX_SUPPLY: NullableBigNumber;
    setMAX_SUPPLY: (num: BigNumber) => void;
    MAX_VIP_WHITE_LIST_SUPPLY: NullableBigNumber;
    setMAX_VIP_WHITE_LIST_SUPPLY: (num: BigNumber) => void;
    MAX_WHITE_LIST_SUPPLY: NullableBigNumber;
    setMAX_WHITE_LIST_SUPPLY: (num: BigNumber) => void;
    totalSupply: NullableBigNumber;
    setTotalSupply: (num: BigNumber) => void;
    mintPrice: NullableBigNumber;
    mintPriceEth: Nullable,
    setMintPrice: (num: BigNumber) => void;
    maxBalance: NullableBigNumber;
    setMaxBalance: (num: BigNumber) => void
    nfts: (INft | BasicNft)[];
    setNfts: (nfts: (INft | BasicNft)[]) => void;
    allNfts: (INft | BasicNft)[];
    setAllNfts: (nfts: (INft | BasicNft)[]) => void;
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
    setNfts: () => {},
    allNfts: [],
    setAllNfts: () => {}
};

const ContractContext = React.createContext({...contractData});

export {
    ContractContext,
    contractData
};