import Moralis from "moralis/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import MintPrice from "./ContractService/MintPrice";
import SetMintPrice from "./ContractService/SetMintPrice";
import TotalSupply from "./ContractService/TotalSupply";
import { nullable } from "./interfaces";

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

    const [totalSupply, setTotalSupply] = useState<nullable>(null);
    const [mintPrice, setMintPrice] = useState<nullable>(null);

    return (
        <div>
            {
                isWeb3Enabled && (
                    <ContractContext.Provider value={{
                        totalSupply,
                        setTotalSupply,
                        mintPrice,
                        setMintPrice
                    }}>
                        <div>
                            <TotalSupply />

                            <MintPrice />

                            <SetMintPrice />

                            <div className="each-item">
                                <button></button>
                            </div>
                        </div>
                    </ContractContext.Provider>
                )
            }
        </div>
    );
};

export default Web3ContractService;