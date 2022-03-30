import { useContext } from "react";
import { useMoralis } from "react-moralis";
import { EventBus } from "src/bus";
import { LangContext } from "src/Context/LangContext";
import moralisConfig from "../moralisConfig";

const LoginService = () => {
    const lang = useContext(LangContext);

    const {
        authenticate,
        isAuthenticated,
        logout
    } = useMoralis();

    const fetchAuthenticate = async () => {
        await authenticate({
            chainId: moralisConfig.chainId,
            signingMessage: lang.SIGNING_MESSAGE
        });
    };

    EventBus.$on(
        'fetchLogin',
        () => new Promise<void>(async (res) => {
            if (isAuthenticated) res();
            await fetchAuthenticate();
            res();
        })
    );

    EventBus.$on(
        'fetchLogout',
        () => new Promise<void>(async (res) => {
            if (!isAuthenticated) res();
            await logout();
            res();
        })
    );

    return (
        null
    );
};

export default LoginService;