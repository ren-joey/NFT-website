import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import FlipBlindBox from "./ContractService/FlipBlindBox";
import MaxBalance from "./ContractService/MaxBalance";
import MintBetamon from "./ContractService/MintBetamon";
import MintPrice from "./ContractService/MintPrice";
import SetMaxBalance from "./ContractService/SetMaxBalance";
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

                        <MaxBalance />
                        <SetMaxBalance />

                        <FlipBlindBox />

                        <MintBetamon />
                    </div>
                )
            }
        </div>
    );
};

export default Web3ContractService;