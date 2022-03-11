import { useContext } from "react";
import { EventContext } from "src/Context/EventContext";
import 'src/components/FirstArea/MintBlock.scss';
import { getResources } from "src/functions/loader";
import EthIcon from "../Shared/EthIcon";
import MintButton from "../Shared/MintButton";
import LinkingAnimation from "./LinkingAnimation";
import { scrollToFaq } from "src/animation/scrollToTrigger";

const MintBlock = () => {
    const { status } = useContext(EventContext);

    return (
        <div className="mint-block">
            <div className="b-alien-container-for-mint-block">
                <div className="b-alien-area">
                    <div className="b-alien-wave"></div>
                    <div className="b-alien-line" style={
                        { backgroundImage: `url(${getResources('b_alien')})` }
                    }></div>
                </div>
            </div>

            <div className="mint-body">
                <div className="mint-title">
                    支付 <EthIcon size="1.4rem" /> 0.1 ETH 即可招喚 B 星人
                </div>

                <MintButton text="連結錢包" style={{ margin: '2rem 0 1rem' }} />

                <LinkingAnimation />
            </div>

            <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>

            <div className="angle left top"></div>
            <div className="angle left bottom"></div>
            {/* <div className="angle right top"></div> */}
            <div className="angle right bottom"></div>
        </div>
    );
};

export default MintBlock;