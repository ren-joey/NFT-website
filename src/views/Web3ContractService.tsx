import { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import * as abi from "./contractAbi";
import moralisConfig from "./moralisConfig";

const Web3ContractService = () => {
    const totalSupplyOptions = {
        contractAddress: moralisConfig.contractAddress,
        functionName: abi.getTotalSupply.name,
        abi: abi.getTotalSupply
    };

    const {
        enableWeb3,
        isWeb3Enabled
    } = useMoralis();
    const {
        data,
        error,
        fetch,
        isFetching,
        isLoading
    } = useWeb3ExecuteFunction(totalSupplyOptions);

    useEffect(() => {
        console.log(error);
    }, [error]);

    useEffect(() => {
        console.log(isWeb3Enabled);
    }, [isWeb3Enabled]);

    useEffect(() => {
        enableWeb3();
    }, []);

    return (
        <div>
            {
                isWeb3Enabled && (
                    <div>
                        <button
                            onClick={() => fetch()}
                            disabled={ isFetching }
                        >Fetch data</button>
                    </div>
                )
            }
        </div>
    );
};

export default Web3ContractService;