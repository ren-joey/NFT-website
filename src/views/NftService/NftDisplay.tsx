import axios from "axios";
import Moralis from "moralis/types";
import { useContext, useEffect } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { blackDescription, blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { ContractContext } from "../ContractService/ContractContext";
import { INft } from "../interfaces";
import moralisConfig from "../moralisConfig";

const NftDisplay = () => {
    const { isAuthenticated } = useMoralis();

    const {
        data,
        getNFTBalances
    } = useNFTBalances();

    const {
        nfts,
        setNfts
    } = useContext(ContractContext);

    const fetchMetadata = async (_nfts: any[]) => {
        const nfts: INft[] = [];
        for (let i = 0; i < _nfts.length; i++) {
            const nft = _nfts[i];
            console.log(nft);
            if (nft.token_uri) {
                const res = await axios({
                    method: 'POST',
                    url: `${moralisConfig.serverUrl}/functions/json`,
                    data: {
                        url: nft.token_uri
                    }
                });

                nfts.push({
                    ...nft,
                    metadata: res.data.result.data
                });
            }
        }

        setNfts(nfts);
    };

    const refreshNft = async ({
        token_address,
        token_id
    }: INft) => {
        // { address: "0xd...07", token_id: "1", flag: "metadata" };
        const nft = await Moralis.Web3API.token.reSyncMetadata({
            address: token_address,
            token_id: token_id,
            flag: 'metadata'
        });

        console.log(nft);
    };

    useEffect(() => {
        const address = moralisConfig.contractAddress;
        const _nfts = data?.result?.filter(nft => nft.token_address === address) || [];
        fetchMetadata(_nfts);
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
                                <button
                                    className={cyanBtn}
                                    onClick={() => refreshNft(nft)}
                                >
                                    Refresh Metadata
                                </button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default NftDisplay;