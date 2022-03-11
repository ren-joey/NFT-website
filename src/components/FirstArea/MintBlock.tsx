import 'src/components/FirstArea/MintBlock.scss';
import { getResources } from "src/functions/loader";
import { scrollToFaq } from "src/animation/scrollToTrigger";
import MintBody, { MintMethodName } from "./MintBody";
import { useContext, useMemo } from 'react';
import { EventContext } from 'src/Context/EventContext';

const MintBlock = () => {
    const { status } = useContext(EventContext);
    const methodName = useMemo<MintMethodName>(() => {
        switch (status) {
            case 0:
                return 'vipWhiteListMintBetamon';
            case 1:
                return 'whiteListMintBetamon';
            default:
                return 'mintBetamon';
        }
    }, [status]);
    const noteText = useMemo(() => {
        switch (status) {
            case 0:
                return '目前為VIP白名單優先Mint召喚時間';
            case 1:
                return '目前為搗蛋白名單優先Mint召喚時間';
            case 2:
                return '注意：首波降臨的β星人每個錢包只能擁有最多 3個 ，超過會召喚失敗';
            case 3:
                return '首波  β星人 已全面解盲，以下是兌換公仔 & 後續階段資訊公佈時間，敬請期待！';
            default:
                return ' β 星人降臨地球搗亂倒數';
        }
    }, [status]);

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

            <MintBody mintMethodName={methodName} />

            <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>

            <div className="note">{ noteText }</div>

            <div className="angle left top"></div>
            <div className="angle left bottom"></div>
            {/* <div className="angle right top"></div> */}
            <div className="angle right bottom"></div>
        </div>
    );
};

export default MintBlock;