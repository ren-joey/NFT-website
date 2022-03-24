import { useMoralis } from "react-moralis";
import { EventBus } from "src/bus";
import moralisConfig from "../moralisConfig";

const LoginService = () => {
    const {
        authenticate,
        isAuthenticated,
        logout
    } = useMoralis();

    const fetchAuthenticate = async () => {
        await authenticate({
            chainId: moralisConfig.chainId,
            signingMessage: moralisConfig.signingMessage
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