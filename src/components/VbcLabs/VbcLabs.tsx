import { useContext } from 'react';
import { EventContext } from 'src/Context/EventContext';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';
import 'src/components/VbcLabs/VbcLabs.scss';
import VbcCharacter from './VbcCharacter';
import SlashesDivider from './SlashesDivider';

const VbcLabs = () => {
    const lang = useContext(LangContext);
    const { device }  = useContext(EventContext);

    return (
        <div className="vbc-labs-wrapper">
            <div className="first-section">
                <div className="info">
                    <div
                        className="title"
                        style={
                            { backgroundImage: `url(${getResources(device === 'desktop'
                                ? 'about_vbc_labs'
                                : 'about_vbc_labs_phone'
                            )})` }
                        }
                    >
                    </div>
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{
                            __html: lang.ABOUT_VBC_LABS
                        }}
                    >
                    </div>
                </div>

                <div className="ceo-area">
                    <div className="w-50">
                        <VbcCharacter idx={1} />
                    </div>
                    <div className="w-50">
                        <VbcCharacter idx={2} />
                    </div>
                </div>
            </div>

            <SlashesDivider content={lang.ABOUT_VBC_DIVIDER_1} />

            {
                device === 'desktop' ? (
                    <>
                        <div className="second-section">
                            {
                                Array(5).fill(0).map((val, idx) => (
                                    <div
                                        className="f-1"
                                        key={idx}
                                    >
                                        <VbcCharacter idx={7 - idx} />
                                    </div>
                                ))
                            }
                        </div>

                        <div className="second-section">
                            {
                                Array(7).fill(0).map((val, idx) => (
                                    <div
                                        className="f-1"
                                        key={idx}
                                    >
                                        <VbcCharacter idx={14 - idx} />
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <div className="second-section">
                        {
                            Array(12).fill(0).map((val, idx) => (
                                <div
                                    className="f-1"
                                    key={idx}
                                >
                                    <VbcCharacter idx={idx + 3} />
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <SlashesDivider content={lang.ABOUT_VBC_DIVIDER_2} />
        </div>
    );
};

export default VbcLabs;
