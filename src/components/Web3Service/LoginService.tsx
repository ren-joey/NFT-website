import { BigNumber } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ContractVariables } from "src/@types/contract";
import { EventBus } from "src/bus";
import { ContractContext } from "src/Context/ContractContext";
import { LangContext } from "src/Context/LangContext";
import moralisConfig from "src/moralisConfig";
import { copyTextToClipboard } from "src/utils/stringFormat/copyTextToClipboard";
import SharedAlert from "../Shared/SharedAlert";
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
        logout,
        authError
    } = useMoralis();

    const {
        fetch
    } = useWeb3ExecuteFunction();

    const [alertState, setAlertState] = useState(false);
    const [timer, setTimer] = useState<undefined | NodeJS.Timeout>(undefined);

    const fetchAuthenticate = async () => {
        await authenticate({
            chainId: moralisConfig.chainId,
            signingMessage: lang.SIGNING_MESSAGE,
            ...moralisConfig.authConfig
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
        if (authError) {
            setTimer(
                setTimeout(() => {
                    setAlertState(true);
                }, 3000)
            );
        }
    }, [authError]);

    useEffect(() => {
        if (isWeb3Enabled) {
            const paramName: ContractVariables = 'getBalance';
            fetchContractVariable<BigNumber | undefined>({
                paramName,
                fetch
            }).then((res) => {
                if (BigNumber.isBigNumber(res) ) {
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
        if (isAuthenticated) {
            if (timer) clearTimeout(timer);
            enableWeb3(moralisConfig.authConfig);
        }
    }, [isAuthenticated, timer]);

    return (
        <>
            <SharedAlert
                content={
                    <div>
                        { lang.COPY_THE_FOLLOWING_URL }
                        <br />
                        { moralisConfig.officialWebsiteUrl }
                    </div>
                }
                btnList={
                    [
                        {
                            text: lang.COPY_AND_CLOSE,
                            onClick: () => {
                                copyTextToClipboard(moralisConfig.officialWebsiteUrl);
                                setAlertState(false);
                            }
                        }
                    ]
                }
                enable={alertState}
            />
        </>
    );
};

export default LoginService;