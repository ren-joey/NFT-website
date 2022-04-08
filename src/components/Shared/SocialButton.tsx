import React from 'react';
import 'src/components/Shared/SocialButton.scss';
import hrefTo from 'src/functions/hrefTo';
import { getResources } from 'src/functions/loader';
import { SocialIconName } from 'src/@types/basicVariable';

interface Props {
    className: string,
    name: string,
    iconName: SocialIconName,
    href: string
}

const SocialButton = ({ className, name, iconName, href }: Props) => {
    const iconUrl = getResources(`${iconName}_icon`);
    const iconStyle: React.CSSProperties = {backgroundImage: `url(${iconUrl})`};

    return (
        <div
            className={`link-btn ${className}`}
            onClick={() => hrefTo({iconName, href})}
        >
            <div className="icon" style={iconStyle}></div>
            <div className="text">
                {name}
            </div>
        </div>
    );
};

export default SocialButton;