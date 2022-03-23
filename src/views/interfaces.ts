import { BigNumber } from "ethers";

export type nullable = (null|number);
export type nullableBigNumber = (null|BigNumber);
export interface IMetadata {
    description: string;
    external_url: string;
    image: string;
    name: string;
    attributes?: any[]
}

export interface INft {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    frozen: number;
    image: string;
    is_valid: number;
    metadata: IMetadata;
    name: string;
    owner_of: string;
    symbol: string;
    synced_at: string;
    syncing: number;
    token_address: string;
    token_id: string;
    token_uri: string;
}

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