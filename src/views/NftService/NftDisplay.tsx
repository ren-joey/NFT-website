import { useContext, useEffect } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { ContractContext } from "../ContractService/ContractContext";
import { INft } from "../interfaces";
import moralisConfig from "../moralisConfig";
import NftWithMetadata from "./NftWithMetadata";
import NftWithoutMetadata from "./NftWithoutMetadata";

const NftDisplay = () => {
    const { isAuthenticated } = useMoralis();

    const {
        data
    } = useNFTBalances();

    const {
        nfts,
        setNfts
    } = useContext(ContractContext);

    useEffect(() => {
        const address = moralisConfig.contractAddress.toLowerCase();
        const _nfts = data?.result?.filter(nft => nft.token_address.toLowerCase() === address)
            || [];

        setNfts(_nfts as INft[]);
    }, [data]);

    return (
        <div className="flex flex-wrap flex- mx-5">
            {
                isAuthenticated && nfts.length > 0 && (
                    nfts.map((nft, idx) => (
                        <div className="flex-1 px-2" key={idx}>
                            {
                                nft.metadata ? (
                                    <NftWithMetadata nft={nft} />
                                ) : (
                                    <NftWithoutMetadata nft={nft} />
                                )
                            }
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default NftDisplay;