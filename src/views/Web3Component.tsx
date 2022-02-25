import moralisConfig from "./moralisConfig";
import { MoralisProvider } from "react-moralis";
import Web3ContractService from "./Web3ContractService";
import UserBalance from "./UserService/UserBalance";
import { ContractContext } from "./ContractService/ContractContext";
import { useState } from "react";
import { IMetadata, INft, nullable } from "./interfaces";
import NftDisplay from "./NftService/NftDisplay";

const web3Style: React.CSSProperties = {color: '#fff'};

const Web3Component = () => {
    const [totalSupply, setTotalSupply] = useState<nullable>(null);
    const [mintPrice, setMintPrice] = useState<nullable>(null);
    const [nfts, setNfts] = useState<INft[]>([]);
    const [isBlindBoxOpened, setIsBlindBoxOpened] = useState<(undefined|boolean)>(undefined);

    return (
        <MoralisProvider
            appId={moralisConfig.appId}
            serverUrl={moralisConfig.serverUrl}
        >
            <ContractContext.Provider value={{
                totalSupply,
                setTotalSupply,
                mintPrice,
                setMintPrice,
                nfts,
                setNfts,
                isBlindBoxOpened,
                setIsBlindBoxOpened
            }}>
                <div style={web3Style}>
                    <UserBalance />

                    <Web3ContractService />

                    <NftDisplay />
                </div>
            </ContractContext.Provider>
        </MoralisProvider>
    );
};

export default Web3Component;