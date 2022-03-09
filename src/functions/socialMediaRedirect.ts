import { socialList } from "src/socialMediaConfig";

const socialMediaRedirect = (redirect: string) => {
    const href = socialList.find(social => social.iconName === redirect)?.href;
    if (href) {
        setTimeout(() => {
            window.location.href = href;
        }, 250);
    }

    return Boolean(href);
};

export default socialMediaRedirect;