import { BtnColorList } from "./basicVariable";
import { StableNft } from "./nft";

export type ExchangeAlertName = 'faq'
                                    | 'basic'
                                    | 'form';

export type SelectedNfts = StableNft[];

export interface BasicAlert {
    type: 'basic',
    alertData: AlertData
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
    onClick?: () => void;
}

export interface AlertData {
    id: string;
    closeBtnEnable?: boolean;
    className?: string;
    content: string|JSX.Element;
    btnList: IBtn[];
    onStart?: () => void;
}

export interface ExchangeAlertState {
    selectedNfts?: StableNft[];
}
