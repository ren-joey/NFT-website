import { getParameterByName, removeParameterByName } from "src/utils";
import gaParser from "./gaParser";
import socialMediaRedirect from "./socialMediaRedirect";

const urlPreprocessing = () => (
    new Promise<void>((res) => {
        const origin = getParameterByName('origin');
        const redirect = getParameterByName('redirect');
        gaParser(origin, redirect);

        let href = removeParameterByName('origin', window.location.href);
        href = removeParameterByName('redirect', href);
        window.history.replaceState({}, document.title, href);

        if (!socialMediaRedirect(redirect)) res();
    })
);

export default urlPreprocessing;