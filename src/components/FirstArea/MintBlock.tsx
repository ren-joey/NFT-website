import 'src/components/FirstArea/MintBlock.scss';
import { getResources } from "src/functions/loader";
import { scrollToFaq } from "src/animation/scrollToTrigger";
import MintBody, { MintMethodName } from "./MintBody";
import { useContext, useMemo } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { nullableBigNumber } from 'src/views/interfaces';
import { ContractContext } from 'src/views/ContractService/ContractContext';
import { lang } from 'moment';
import { LangContext } from 'src/Context/LangContext';
import hrefTo from 'src/functions/hrefTo';
import { socialList } from 'src/socialMediaConfig';

interface IProps {
    remain: nullableBigNumber
}

const MintBlock = ({ remain }: IProps) => {
    const { status } = useContext(EventContext);
    const { maxBalance } = useContext(ContractContext);
    const lang = useContext(LangContext);
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
            case -1:
                return lang.MINT_BLOCK_NOTE_1;
            case 0:
                if (remain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_2_SOLD_OUT;
                }
                return lang.MINT_BLOCK_NOTE_2;
            case 1:
                if (remain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_3_SOLD_OUT;
                }
                return lang.MINT_BLOCK_NOTE_3;
            case 2:
                if (remain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_4_SOLD_OUT;
                }
                if (maxBalance === null) return '';
                return lang.MINT_BLOCK_NOTE_4.replace('${}', maxBalance.toString());
            case 3:
                return lang.MINT_BLOCK_NOTE_5;
            default:
                return lang.MINT_BLOCK_NOTE_DEFAULT;
        }
    }, [status, remain, maxBalance, lang]);

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

            <MintBody mintMethodName={methodName} remain={remain} />

            <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>

            <div className="note">
                {noteText}
            </div>

            <div className="angle left top"></div>
            <div className="angle left bottom"></div>
            {/* <div className="angle right top"></div> */}
            <div className="angle right bottom"></div>

            <div className="subevent-btn" onClick={() => hrefTo(socialList[4])}>
                <div className="label">{lang.PROMOTION_1_LABEL}</div>
                <div className="hgl">{lang.PROMOTION_1_TITLE_BOLD}</div>
                <div className="text">{lang.PROMOTION_1_TITLE}&emsp;</div>
                <div className="hgl text-stroke">›</div>
            </div>
        </div>
    );
};

export default MintBlock;