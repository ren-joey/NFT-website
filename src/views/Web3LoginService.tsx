import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import moralisConfig from "./moralisConfig";

const Web3LoginService = () => {
    const {
        authenticate,
        isAuthenticated,
        user,
        logout,
        enableWeb3,
        isWeb3Enabled
    } = useMoralis();

    useEffect(() => {
        enableWeb3();
    }, []);

    return (
        <div>
            {
                !isAuthenticated ? (
                    <button onClick={() => authenticate(
                        {
                            chainId: moralisConfig.chainId,
                            signingMessage: moralisConfig.signingMessage
                        }
                    )}>
                        login
                    </button>
                ) : (
                    <button onClick={() => logout()}>logout</button>
                )
            }
        </div>
    );
};

export default Web3LoginService;