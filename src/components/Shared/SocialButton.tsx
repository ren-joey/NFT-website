import React from 'react';
import 'src/components/Shared/SocialButton.scss';
import { getResources } from 'src/functions/loader';
import { socialIconName } from 'src/socialMediaConfig';

interface Props {
    className: string,
    name: string,
    iconName: socialIconName,
    href: string
}

const SocialButton = ({ className, name, iconName, href }: Props) => {
    const iconUrl = getResources(`${iconName}_icon`);
    const iconStyle: React.CSSProperties = {backgroundImage: `url(${iconUrl})`};

    return (
        <a
            className={`link-btn ${className}`}
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            <div className="icon" style={iconStyle}></div>
            <div className="text">
                {name}
            </div>
        </a>
    );
};

export default SocialButton;