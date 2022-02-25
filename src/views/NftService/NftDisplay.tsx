import { useContext, useEffect } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { blackDescription, blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { ContractContext } from "../ContractService/ContractContext";
import { INft } from "../interfaces";
import moralisConfig from "../moralisConfig";
import { refreshNft } from "./functions";

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
        const address = moralisConfig.contractAddress;
        const _nfts = data?.result?.filter(nft => nft.token_address === address) || [];

        setNfts(_nfts as INft[]);
    }, [data]);

    return (
        <div className="flex flex-wrap mx-5">
            {
                isAuthenticated && nfts.length > 0 && (
                    nfts.map((nft, idx) => (
                        <div className="flex-1 px-2" key={idx}>
                            <div className={`${whiteCard} flex-col`}>
                                <img src={nft.metadata.image} alt={nft.metadata.name} />
                                <h3 className={`${blackTitle} mt-5`}>
                                    {nft.metadata.name}
                                </h3>
                                <div className={blackDescription}>
                                    {nft.metadata.description}
                                </div>
                                <div className="mt-2">
                                    <button
                                        className={cyanBtn}
                                        onClick={() => refreshNft(nft)}
                                    >
                                        Refresh Metadata
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default NftDisplay;