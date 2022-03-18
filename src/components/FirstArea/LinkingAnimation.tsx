import { useContext } from 'react';
import 'src/components/FirstArea/LinkingAnimation.scss';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';

const LinkingAnimation = () => {
    const { device } = useContext(EventContext);

    return (
        <div className="linking-animation-wrap">
            <div className="skull-outline-icon" style={
                { backgroundImage: `url(${getResources('skull_icon_outline')})` }
            }></div>

            <div className="line-animation-area">
                <div className="dotted-line">
                    { device === 'desktop' ? '......................' : '.............' }
                </div>
                <div className="star-container">
                    <div className="star" style={
                        { backgroundImage: `url(${getResources('star_icon')})` }
                    }></div>
                </div>
            </div>

            <div className="wallet-icon" style={
                { backgroundImage: `url(${getResources('wallet_icon')})` }
            }></div>
        </div>
    );
};

export default LinkingAnimation;