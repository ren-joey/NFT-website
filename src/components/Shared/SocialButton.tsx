import React from 'react';
import 'src/components/Shared/SocialButton.scss';
import { getResources } from 'src/functions/loader';

interface Props {
    className: string,
    name: string,
    iconName: 'twitter'|'opensea'|'discord'
}

const SocialButton = ({ className, name, iconName }: Props) => {
    const iconUrl = getResources(`${iconName}_icon`);
    const iconStyle: React.CSSProperties = {backgroundImage: `url(${iconUrl})`};

    return (
        <div className={`link-btn ${className}`}>
            <div className="icon" style={iconStyle}></div>
            <div className="text">
                {name}
            </div>
        </div>
    );
};

export default SocialButton;