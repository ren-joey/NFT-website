import 'src/components/FirstArea/ExchangeBlock/CoverBoard.scss';
import { getResources } from "src/functions/loader";
import { scrollToFaq } from "src/animation/scrollToTrigger";
import { useContext, useMemo } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import hrefTo from 'src/functions/hrefTo';
import { socialList } from 'src/socialMediaConfig';
import { NullableBigNumber } from 'src/@types/basicVariable';
import { ExchangePageName } from 'src/components/FirstArea/ExchangeBlock/ExchangeBlock';
import SubeventButton from '../SubeventButton/SubeventButton';
import SharedPurpleBlock from 'src/components/Shared/SharedPurpleBlock';
import EthIcon from 'src/components/Shared/EthIcon';
import { roundDecimal } from 'src/utils';
import MintButton from 'src/components/Shared/MintButton';
import SharedLoginButton from 'src/components/Shared/SharedLoginButton';
import LinkingAnimation from '../PurpleBlock/LinkingAnimation';

interface Props {
    setExchangePage: (key: ExchangePageName) => void
}

const CoverBoard = ({
    setExchangePage
}: Props) => {
    const { device } = useContext(EventContext);
    const lang = useContext(LangContext);

    return (
        <SharedPurpleBlock content={
            <div className="cover-board">
                <div className="b-alien-container-for-mint-block">
                    <div className="b-alien-area">
                        <div className="b-alien-line" style={
                            { backgroundImage: `url(${getResources('3d_betamon')})` }
                        }></div>
                    </div>
                </div>

                <div className="mint-body single">
                    <div className="mint-title">
                        {lang.MINT_BODY_TITLE_1}
                    &nbsp;
                        <EthIcon size={device === 'desktop' ? '1.4rem' : '0.8rem'} />
                    &nbsp;
                        {lang.MINT_BODY_TITLE_2}
                    </div>

                    <SharedLoginButton />

                    <LinkingAnimation type="exchange" />
                </div>

                <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>

                <SubeventButton />
            </div>
        } />
    );
};

export default CoverBoard;