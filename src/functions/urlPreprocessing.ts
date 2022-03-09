import { getParameterByName, removeParameterByName } from "src/utils";
import gaParser from "./gaParser";
import socialMediaRedirect from "./socialMediaRedirect";

const urlPreprocessing = () => (
    new Promise<void>((res) => {
        const origin = getParameterByName('o');
        const redirect = getParameterByName('r');
        const category = getParameterByName('c');
        if (!origin && !redirect && !category) res(undefined);

        gaParser(origin, redirect, category);

        let href = removeParameterByName('o', window.location.href);
        href = removeParameterByName('r', href);
        href = removeParameterByName('c', href);
        window.history.replaceState({}, document.title, href);

        if (!socialMediaRedirect(redirect)) res();
    })
);

export default urlPreprocessing;