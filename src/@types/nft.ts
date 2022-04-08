import { ChainList } from "./contract";
import { IMetadata } from "./metadata";

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

export interface IMoralisConfig {
    serverUrl: string,
    appId: string,
    contractAddress: string,
    ownerAddress: string,
    provider: ChainList,
    chainId: number,
    etherscanUrl: string,
    metadataBaseUrl: string,
    imageUrl: string
}