import { getResources } from 'src/functions/loader';
import { useContext } from 'react';
import { LangContext } from 'src/Context/LangContext';
import SubeventButton from '../SubeventButton/SubeventButton';
import SharedPurpleBlock from 'src/components/Shared/SharedPurpleBlock';
import LinkingAnimation from '../PurpleBlock/LinkingAnimation';
import SharedFaqButton from 'src/components/Shared/Buttons/SharedFaqButton';
import SharedLoginButton from 'src/components/Shared/Buttons/SharedLoginButton';
import 'src/components/FirstArea/ExchangeBlock/CoverBoard.scss';

const CoverBoard = () => {
    const lang = useContext(LangContext);

    return (
        <SharedPurpleBlock
            className="pc-w-800"
            content={
                <div className="cover-board">
                    <div className="b-alien-container-for-mint-block">
                        <div className="b-alien-area">
                            <div
                                className="b-alien-line"
                                style={
                                    { backgroundImage: `url(${getResources('3d_betamon')})` }
                                }
                            >
                            </div>
                        </div>
                    </div>

                    <div className="mint-body single">
                        <div className="mint-title text-center pre-line">
                            { lang.EXCHANGE_COVER_TITLE }
                        </div>

                        <SharedLoginButton />

                        <LinkingAnimation type="exchange" />
                    </div>

                    <SharedFaqButton />
                    <SubeventButton />
                </div>
            }
        />
    );
};

export default CoverBoard;