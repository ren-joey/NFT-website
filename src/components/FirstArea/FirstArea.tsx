/* cSpell:words UTCZ */

import { LangContext } from 'src/Context/LangContext';
import { useContext } from 'react';
import Counter from 'src/components/FirstArea/Counter';
import { config } from 'src/config';
import SocialButton from 'src/components/Shared/SocialButton';
import 'src/components/FirstArea/FirstArea.scss';
import { getResources } from 'src/functions/loader';
import { socialList } from 'src/socialMediaConfig';

const FirstArea = () => {
    const lang = useContext(LangContext);
    const { now, getEnd } = config;
    const end = getEnd();
    const diff = end.diff(now);
    const spotlightLeft: React.CSSProperties = { backgroundImage: `url(${getResources('spotlight_left')})` };

    return (
        <div className="first-area">
            <div className="front-container">
                <div className="b-alien-area">
                    <div className="spotlight" style={spotlightLeft}></div>
                    <div className="spotlight reverse" style={spotlightLeft}></div>
                    <div className="ground" style={
                        {backgroundImage: `url(${getResources('b_alien_ground')})`}
                    }></div>
                    <div className="b-alien-wave"></div>
                    <div className="b-alien-line" style={
                        { backgroundImage: `url(${getResources('b_alien')})` }
                    }></div>
                </div>

                <div className="reveal-time-area">
                    {
                        diff > 0 &&
                            <div className="reveal-time">
                                { end.format('MMMM D YYYY HH:mm:ss UTCZ') }
                            </div>
                    }
                </div>

                <Counter />

                <div className="title-area">
                    <div className="title"
                        dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_TITLE}}
                    ></div>
                    <div className="desc"
                        dangerouslySetInnerHTML={{__html: lang.FIRST_AREA_DESC}}
                    ></div>
                </div>

                <div className="link-area">
                    {
                        socialList.map((social, idx) => (
                            social.visible &&
                                <SocialButton
                                    className={social.iconName}
                                    name={social.title}
                                    iconName={social.iconName}
                                    href={social.href}
                                    key={idx}
                                />
                        ))
                    }
                </div>

                <div className="b-alien-area-sm">
                    <div className="b-alien-wave">
                        <div className="b-alien-stroke" style={
                            { backgroundImage: `url(${getResources('b_alien')})` }
                        }></div>
                        <div className="spotlight" style={spotlightLeft}></div>
                        <div className="spotlight reverse" style={spotlightLeft}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstArea;