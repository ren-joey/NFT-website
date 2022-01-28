import { LangContext } from 'src/Context/LangContext';
import { useContext } from 'react';
import Counter from 'src/components/FirstArea/Counter';
import { config } from 'src/config';
import SocialButton from 'src/components/Shared/SocialButton';
import 'src/components/FirstArea/FirstArea.scss';

const FirstArea = () => {
    const lang = useContext(LangContext);
    const { now, getEnd } = config;
    const end = getEnd();
    const diff = end.diff(now);

    return (
        <div className="first-area">
            <div className="front-container">
                <div className="b-alien-area">
                    <div className="spotlight"></div>
                    <div className="spotlight reverse"></div>
                    <div className="ground"></div>
                    <div className="b-alien-wave"></div>
                    <div className="b-alien-line"></div>
                </div>

                <div className="reveal-time-area">
                    {
                        diff > 0
                            ? <div className="reveal-time">
                                { end.format('MMMM D YYYY HH:mm:ss UTCZ') }
                            </div>
                            : ''
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
                    <SocialButton className='twitter' name='Twitter' />
                    <SocialButton className='discord' name='Discord' />
                    {/* <SocialButton className='opensea' name='OpenSea' /> */}
                </div>

                <div className="b-alien-area-sm">
                    <div className="b-alien-wave">
                        <div className="b-alien-stroke"></div>
                        <div className="spotlight"></div>
                        <div className="spotlight reverse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstArea;