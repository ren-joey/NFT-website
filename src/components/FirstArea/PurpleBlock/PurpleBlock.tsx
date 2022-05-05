import 'src/components/FirstArea/PurpleBlock/PurpleBlock.scss';
import { getResources } from "src/functions/loader";
import { scrollToFaq } from "src/animation/scrollToTrigger";
import { useContext, useMemo } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { ContractContext } from 'src/Context/ContractContext';
import { LangContext } from 'src/Context/LangContext';
import stringReplacer from 'src/utils/stringFormat/stringReplacer';
import { NullableBigNumber } from 'src/@types/basicVariable';
import { MintMethodName } from 'src/@types/contract';
import MintBody from './MintBody';
import SubeventButton from '../SubeventButton/SubeventButton';
import SharedPurpleBlock from 'src/components/Shared/SharedPurpleBlock';

interface IProps {
    supplyRemain: NullableBigNumber
}

const PurpleBlock = ({ supplyRemain }: IProps) => {
    const { status } = useContext(EventContext);
    const { maxBalance } = useContext(ContractContext);
    const lang = useContext(LangContext);

    const spotlightLeft: React.CSSProperties = { backgroundImage: `url(${getResources('spotlight_left')})` };
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
                if (supplyRemain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_2_SOLD_OUT;
                }
                return lang.MINT_BLOCK_NOTE_2;
            case 1:
                if (supplyRemain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_3_SOLD_OUT;
                }
                return lang.MINT_BLOCK_NOTE_3;
            case 2:
                if (supplyRemain?.isZero()) {
                    return lang.MINT_BLOCK_NOTE_4_SOLD_OUT;
                }
                if (maxBalance === null) return '';
                return stringReplacer(lang.MINT_BLOCK_NOTE_4, maxBalance);
            case 3:
                return lang.MINT_BLOCK_NOTE_5;
            default:
                return lang.MINT_BLOCK_NOTE_DEFAULT;
        }
    }, [status, supplyRemain, maxBalance, lang]);

    return (
        <SharedPurpleBlock content={
            <div className='purple-block'>
                <div className={`b-alien-container-for-mint-block ${status === 3 && 'center'}`}>
                    <div className="b-alien-area">
                        <div className="b-alien-wave"></div>
                        <div className="b-alien-line" style={
                            { backgroundImage: `url(${getResources('b_alien')})` }
                        }></div>
                        { status === 3 && <div className="spotlight" style={spotlightLeft}></div> }
                        { status === 3 && <div className="spotlight reverse" style={spotlightLeft}></div> }
                    </div>
                </div>

                {
                    status < 3 && (
                        <MintBody mintMethodName={methodName} supplyRemain={supplyRemain} />
                    )
                }

                <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>

                <div className="note">
                    {noteText}
                </div>

                <SubeventButton />
            </div>
        } />
    );
};

export default PurpleBlock;