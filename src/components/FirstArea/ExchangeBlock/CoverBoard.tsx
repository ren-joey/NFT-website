import 'src/components/FirstArea/ExchangeBlock/CoverBoard.scss';
import { getResources } from "src/functions/loader";
import { scrollToFaq } from "src/animation/scrollToTrigger";
import { useContext, useEffect, useMemo } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import hrefTo from 'src/functions/hrefTo';
import { socialList } from 'src/socialMediaConfig';
import { NullableBigNumber } from 'src/@types/basicVariable';
import { ExchangePageName } from 'src/components/FirstArea/ExchangeBlock/ExchangeBlock';
import SubeventButton from '../SubeventButton/SubeventButton';
import SharedPurpleBlock from 'src/components/Shared/SharedPurpleBlock';
import LinkingAnimation from '../PurpleBlock/LinkingAnimation';
import SharedButtonLg from 'src/components/Shared/Buttons/SharedButtonLg';
import SharedFaqButton from 'src/components/Shared/Buttons/SharedFaqButton';
import SharedLoginButton from 'src/components/Shared/Buttons/SharedLoginButton';
import { useMoralis } from 'react-moralis';

const CoverBoard = () => {
    const lang = useContext(LangContext);

    return (
        <SharedPurpleBlock
            className="pc-w-800"
            content={
                <div className="cover-board">
                    <div className="b-alien-container-for-mint-block">
                        <div className="b-alien-area">
                            <div className="b-alien-line" style={
                                { backgroundImage: `url(${getResources('3d_betamon')})` }
                            }></div>
                        </div>
                    </div>

                    <div className="mint-body single">
                        <div className="mint-title text-center pre-line">
                            { lang.EXCHANGE_COVER_TITLE }
                        </div>

                        {/* <SharedButtonLg
                            onClick={() => setExchangePage('main') }
                            text={ lang.EXCHANGE_COVER_BTN }
                        /> */}
                        <SharedLoginButton />

                        <LinkingAnimation type="exchange" />
                    </div>

                    <SharedFaqButton />
                    <SubeventButton />
                </div>
            } />
    );
};

export default CoverBoard;