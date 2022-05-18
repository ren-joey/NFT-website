import hrefTo from 'src/functions/hrefTo';
import { getResources } from 'src/functions/loader';
import { ISocialList } from 'src/configs/socialMediaConfig';
import 'src/components/Shared/Buttons/SocialIconButton.scss';

interface IProps {
    social: ISocialList
}

const SocialIconButton = ({ social }: IProps) => {
    const iconUrl = getResources(`${social.iconName}_icon_gradient`);

    return (
        <div className="social-link-area">
            <div
                className="social-link-btn"
                onClick={() => hrefTo(social)}
                style={{backgroundImage: `url(${iconUrl})`}}></div>
            <div className={`social-text-bubble ${social.iconName}`}>
                {social.iconName}
            </div>
        </div>
    );
};

export default SocialIconButton;