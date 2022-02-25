export type nullable = (null|number);

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
    totalSupply: nullable;
    setTotalSupply: (num: nullable) => void;
    mintPrice: nullable;
    setMintPrice: (num: nullable) => void;
    nfts: INft[];
    setNfts: (nfts: INft[]) => void;
    isBlindBoxOpened: (undefined|boolean);
    setIsBlindBoxOpened: (bool: boolean) => void;
}