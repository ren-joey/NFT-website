import { useMoralis } from "react-moralis";
import moralisConfig from "../moralisConfig";

const className = 'bg-cyan-700 rounded text-white px-2 py-1 ml-auto uppercase font-bold';

const LoginService = () => {
    const {
        authenticate,
        isAuthenticated,
        logout
    } = useMoralis();

    const fetchAuthenticate = () => {
        authenticate({
            chainId: moralisConfig.chainId,
            signingMessage: moralisConfig.signingMessage
        });
    };

    return (
        <div>
            {
                !isAuthenticated ? (
                    <button className={className} onClick={() => fetchAuthenticate()}>
                        login
                    </button>
                ) : (
                    <button className={className} onClick={() => logout()}>logout</button>
                )
            }
        </div>
    );
};

export default LoginService;