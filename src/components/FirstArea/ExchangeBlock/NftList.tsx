import { CSSProperties, useContext, useMemo, useReducer } from "react";
import { useMoralis } from "react-moralis";
import { StableNftMembers } from "src/@types/nft";
import { EventBus } from "src/bus";
import SharedButtonLg from "src/components/Shared/Buttons/SharedButtonLg";
import SharedFaqButton from "src/components/Shared/Buttons/SharedFaqButton";
import SharedPurpleBlock from "src/components/Shared/SharedPurpleBlock";
import sendSignatureRequest from "src/components/Web3Service/functions/sendSignatureRequest";
import NftBalance from "src/components/Web3Service/NftBalance";
import NftStableBalance from "src/components/Web3Service/NftStableBalance";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import { getParameterByName } from "src/utils";
import SubeventButton from "../SubeventButton/SubeventButton";
import NftListPaginator from "./NftListPaginator";
import "src/components/FirstArea/ExchangeBlock/NftList.scss";
import hrefTo from "src/functions/hrefTo";
import { socialList } from "src/configs/socialMediaConfig";

const NftList = ({
    stableNfts,
    setStableNfts,
    selectedNftAmount
}: StableNftMembers) => {
    const lang = useContext(LangContext);
    const { account } = useMoralis();

    return (
        <div className="nft-list">
            <SharedPurpleBlock content={
                <div className="nft-container">
                    <NftListPaginator stableNfts={stableNfts} />

                    <div className="nft-title-board" style={
                        { backgroundImage: `url(${getResources('alert_title_board')})` }
                    }>
                        <div className="title-text">
                            { lang.REIFICATION_TITLE }
                        </div>
                    </div>

                    <div className="nft-title">
                        { lang.REIFICATION_DESC }
                    </div>

                    {/* 單純取得 nftBalance 資料 */}
                    <NftBalance />

                    {/* 負責將 nftBalance 打印到 dom 上 */}
                    <NftStableBalance
                        setStableNfts={setStableNfts}
                        stableNfts={stableNfts}
                    />

                    {
                        // [DEV]
                        getParameterByName('logout') && (
                            <button onClick={() => EventBus.$emit('fetchLogout')}>{lang.LOGOUT}</button>
                        )
                    }

                    {
                        // [DEV]
                        getParameterByName('signature') && (
                            <button onClick={() => {
                                if (account) {
                                    sendSignatureRequest({
                                        account: account || '',
                                        message: 'test'
                                    });
                                }
                            }}>簽名</button>
                        )
                    }

                    {
                        stableNfts.length > 0 ? (
                            <SharedButtonLg
                                disable={selectedNftAmount === 0}
                                onClick={() => EventBus.$emit('form')}
                                text={ lang.EXCHANGE_COVER_BTN }
                            />
                        ) : (
                            <SharedButtonLg
                                onClick={() => hrefTo(socialList[0])}
                                text={ lang.GO_TO_OPENSEA_AND_BUY }
                            />
                        )
                    }

                    <SharedFaqButton onClick={() => EventBus.$emit('faq')} />

                    <SubeventButton />
                </div>
            } />
        </div>
    );
};

export default NftList;