import React from 'react';
import 'src/components/Shared/SocialButton.scss';
import { getResources } from 'src/functions/loader';
import { socialIconName } from 'src/socialMediaConfig';

interface Props {
    className: string,
    name: string,
    iconName: socialIconName
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