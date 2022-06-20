import { socialList } from "src/configs/socialMediaConfig";
import SocialButton from "../Shared/Buttons/SocialButton";

const LinkArea = () => (
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
);

export default LinkArea;