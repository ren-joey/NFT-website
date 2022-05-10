import { useContext } from "react";
import { NftExchangeEssentials } from "src/@types/viewVariables";
import { EventBus } from "src/bus";
import SharedButtonLg from "src/components/Shared/Buttons/SharedButtonLg";
import SharedFaqButton from "src/components/Shared/Buttons/SharedFaqButton";
import SharedPurpleBlock from "src/components/Shared/SharedPurpleBlock";
import NftBalance from "src/components/Web3Service/NftBalance";
import NftStableBalance from "src/components/Web3Service/NftStableBalance";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import { getParameterByName } from "src/utils";
import SubeventButton from "../SubeventButton/SubeventButton";

const NftList = ({
    stableNfts,
    setStableNfts,
    selectedNftAmount,
    disableAlert,
    setAlert
}: NftExchangeEssentials) => {
    const lang = useContext(LangContext);
    const setFormAlert = () => {
        // TODO:
        // const

        setAlert({
            type: 'form'

        });
    };

    return (
        <div className="nft-list">
            <SharedPurpleBlock content={
                <div className="nft-container">
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

                    <SharedButtonLg
                        disable={selectedNftAmount === 0}
                        onClick={() => {}}
                        text={ lang.EXCHANGE_COVER_BTN }
                    />

                    <SharedFaqButton />
                    <SubeventButton />
                </div>
            } />
        </div>
    );
};

export default NftList;