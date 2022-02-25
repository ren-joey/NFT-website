import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import FlipBlindBox from "./ContractService/FlipBlindBox";
import MintPrice from "./ContractService/MintPrice";
import SetMintPrice from "./ContractService/SetMintPrice";
import TotalSupply from "./ContractService/TotalSupply";

const Web3ContractService = () => {
    const {
        enableWeb3,
        isWeb3Enabled,
        isAuthenticated
    } = useMoralis();

    useEffect(() => {
        if (isAuthenticated) {
            try {
                enableWeb3();
            } catch (e) {
                console.log('Web3ContractService error:'); // [DEV]
                console.log(e);
            }
        }
    }, [isAuthenticated]);



    return (
        <div>
            {
                isWeb3Enabled && (
                    <div>
                        <TotalSupply />

                        <MintPrice />

                        <SetMintPrice />

                        <FlipBlindBox />
                    </div>
                )
            }
        </div>
    );
};

export default Web3ContractService;