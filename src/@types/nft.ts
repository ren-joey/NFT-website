import { ChainList } from './contract';
import { IMetadata } from './metadata';

export type Web3Provider = 'metamask'
                            | 'walletconnect'
                            | 'walletConnect'
                            | 'wc'
                            | 'magicLink'
                            | 'web3Auth';

interface Provider {
    provider?: Web3Provider;
}

export interface StableNftMembers {
    stableNfts: StableNftOption[];
    setStableNfts: (key: StableNftOption[]) => void;
    selectedNftAmount: number;
}

export interface StableNftOption extends StableNft {
    select: boolean;
}

export interface StableNft {
    token_id: string;
    metadata: IMetadata;
    owner_of: string;
}

export interface BasicNft {
    token_id: string;
    metadata: IMetadata | undefined;
    owner_of: string;
}

export interface INft {
    image?: string | null | undefined;
    metadata?: IMetadata | string | undefined;
    token_address: string;
    token_id: string;
    contract_type: string;
    owner_of?: string;
    block_number?: string;
    block_number_minted?: string;
    token_uri?: string | undefined;
    synced_at?: string | undefined;
    amount?: string | undefined;
    name: string;
    symbol: string;
}

export interface EthConfig {
    officialWebsiteUrl: string;
    serverUrl: string;
    appId: string;
    contractAddress: string;
    ownerAddress: string;
    provider: ChainList;
    chainId: number;
    etherscanUrl: string;
    metadataBaseUrl: string;
    imageUrl: string;
    authConfig: Provider;
    version: string;
    exchangeOpen: boolean;
    nftExchangeOfficialAddress: string;
}