import { useContext } from "react";
import SharedFaqButton from "src/components/Shared/Buttons/SharedFaqButton";
import SharedPurpleBlock from "src/components/Shared/SharedPurpleBlock";
import { LangContext } from "src/Context/LangContext";
import { getResources } from "src/functions/loader";
import SubeventButton from "../SubeventButton/SubeventButton";

const NftList = () => {
    const {

    } = useContext(LangContext);

    return (
        <div className="nft-list">
            <SharedPurpleBlock content={
                <div className="nft-container">
                    <div className="nft-title-board" style={
                        { backgroundImage: `url(${getResources('alert_title_board')})` }
                    }>
                        <div className="title-text">
                            實體具象召喚所
                        </div>
                    </div>
                    1<br />
                    1<br />
                    1<br />
                    1<br />
                    <SharedFaqButton />
                    <SubeventButton />
                </div>
            } />
        </div>
    );
};

export default NftList;