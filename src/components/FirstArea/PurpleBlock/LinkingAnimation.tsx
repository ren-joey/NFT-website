import React, { useContext, useEffect, useState } from 'react';
import 'src/components/FirstArea/PurpleBlock/LinkingAnimation.scss';
import { EventContext } from 'src/Context/EventContext';
import { getResources } from 'src/functions/loader';

interface Props {
    type?: 'walletconnect' | 'exchange'
}

const LinkingAnimation = ({ type = 'walletconnect' }: Props) => {
    const { device } = useContext(EventContext);
    const [leftIcon, setLeftIcon] = useState<React.CSSProperties>({});
    const [rightIcon, setRightIcon] = useState<React.CSSProperties>({});
    const [images] = useState({
        skull: { backgroundImage: `url(${getResources('skull_icon_outline')})` },
        wallet: { backgroundImage: `url(${getResources('wallet_icon')})` },
        star: { backgroundImage: `url(${getResources('star_icon')})` },
        planet: { backgroundImage: `url(${getResources('planet_icon')})` },
        earth: { backgroundImage: `url(${getResources('earth_icon')})` }
    });

    useEffect(() => {
        if (type === 'walletconnect') {
            setLeftIcon(images.skull);
            setRightIcon(images.wallet);
        } else if (type === 'exchange') {
            setLeftIcon(images.planet);
            setRightIcon(images.earth);
        }
    }, [type]);

    return (
        <div className="linking-animation-wrap">
            <div className="skull-outline-icon" style={leftIcon}></div>

            <div className="line-animation-area">
                <div className="dotted-line">
                    { device === 'desktop' ? '......................' : '.............' }
                </div>
                <div className="star-container">
                    <div className="star" style={images.star}></div>
                </div>
            </div>

            <div className="wallet-icon" style={rightIcon}></div>
        </div>
    );
};

export default LinkingAnimation;