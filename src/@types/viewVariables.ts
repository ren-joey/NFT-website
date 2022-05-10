import { BtnColorList } from "./basicVariable";
import { StableNft, StableNftMembers } from "./nft";

export type ExchangeAlertName = 'faq'
                                    | 'basic'
                                    | 'form';

export type SelectedNfts = StableNft[];

export interface NftExchangeEssentials extends StableNftMembers, NftExchangeAlertHandlers {}

export interface BasicAlert {
    type: 'basic',
    alertData: IAlertData
}

export interface FaqAlert {
    type: 'faq'
}

export interface FormAlert {
    type: 'form',
    stableNfts: StableNft[]
}

export interface IBtn {
    text: string;
    type?: BtnColorList;
    onClick: () => void;
}

export interface IAlertData {
    enable: boolean;
    content: string|JSX.Element;
    btnList: IBtn[];
}

export interface ExchangeAlertState {
    enable: boolean;
    type: ExchangeAlertName;
    alertData?: IAlertData;
    stableNfts?: StableNft[];
}

export interface NftExchangeAlertHandlers {
    setAlert: (key: Omit<
        ExchangeAlertState,
        'enable'
    >) => void;
    disableAlert: () => void;
}

export interface NftAlertEssentials extends ExchangeAlertState, NftExchangeAlertHandlers {}
