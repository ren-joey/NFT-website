import { BigNumber } from "ethers";
import { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ContractVariables } from "src/@types/contract";
import { EventBus } from "src/bus";
import { ContractContext } from "src/Context/ContractContext";
import { LangContext } from "src/Context/LangContext";
import deviceDetector from "src/functions/deviceDetector";
import moralisConfig from "src/moralisConfig";
import { getParameterByName } from "src/utils";
import fetchContractVariable from "./functions/fetchContractVariable";
import { getContractContextBigNumSetter } from "./functions/getContractContextSetter";

const LoginService = () => {
    const contractContext = useContext(ContractContext);

    const lang = useContext(LangContext);

    const {
        authenticate,
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3,
        account,
        logout
    } = useMoralis();

    const {
        fetch
    } = useWeb3ExecuteFunction();

    const fetchAuthenticate = async () => {
        await authenticate({
            chainId: moralisConfig.chainId,
            signingMessage: lang.SIGNING_MESSAGE,
            ...(deviceDetector.device?.type !== 'desktop') ? {
                provider: 'walletconnect'
            } :  {
                provider: 'metamask'
            }
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

    useEffect(() => {
        setTimeout(() => {
            if (getParameterByName('auto-login')) {
                if (!isAuthenticated) {
                    fetchAuthenticate();
                }
            }
        }, 1000);
    }, []);

    useEffect(() => {
        if (isWeb3Enabled) {
            const paramName: ContractVariables = 'getBalance';
            fetchContractVariable<BigNumber | undefined>({
                paramName,
                fetch
            }).then((res) => {
                if (res instanceof BigNumber) {
                    const setter = getContractContextBigNumSetter({
                        contractContext,
                        paramName
                    });
                    setter(res);
                }
            });
        }
    }, [account]);

    useEffect(() => {
        if (isAuthenticated) enableWeb3(
            deviceDetector.device?.type !== 'desktop' ? {
                provider: 'walletconnect'
            } : {
                provider: 'metamask'
            }
        );
    }, [isAuthenticated]);

    return (
        null
    );
};

export default LoginService;