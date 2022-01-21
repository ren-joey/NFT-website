import { LangContext } from 'src/Context/LangContext';
import 'src/components/FirstArea/FirstArea.scss';
import { useContext } from 'react';
import Counter from 'src/components/FirstArea/Counter';
import SocialButton from '../Shared/SocialButton';

const FirstArea = () => {
    const lang = useContext(LangContext);
    return (
        <div className="first-area">
            <div className="front-container">
                <div className="b-alien-area">
                    <div className="spotlight"></div>
                    <div className="spotlight reverse"></div>
                </div>

                <div className="reveal-time-area">
                    <div className="reveal-time">
                        March 1 2022 13:00:00 UTC+8
                    </div>
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
                    <SocialButton className='opensea' name='OpenSea' />
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
}

export default FirstArea;