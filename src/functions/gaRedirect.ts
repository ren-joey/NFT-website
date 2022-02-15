import { socialList } from "src/socialMediaConfig";

const gaRedirect = (redirect: string) => {
    const href = socialList.find(social => social.iconName === redirect)?.href;
    if (href) window.location.href = href;
};

export default gaRedirect;