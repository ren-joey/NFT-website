import { useContext } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { BasicNft, INft } from "src/@types/nft";
import { ContractContext } from "src/Context/ContractContext";
import moralisConfig from "src/configs/moralisConfig";
import fetchContractVariable from "./functions/fetchContractVariable";

const NftTransfer = () => {
    const { fetch } = useWeb3ExecuteFunction();
    const { nfts } = useContext(ContractContext);

    const doTransfer = (nft: (INft | BasicNft)) => {
        fetchContractVariable<void>({
            fetch,
            paramName: 'transferFrom',
            params: {
                from: nft.owner_of,
                to: moralisConfig.ownerAddress,
                tokenId: nft.token_id
            }
        });
    };

    return (
        <>
            {
                nfts.length > 0 && (
                    nfts.map((nft, idx) => {
                        const nftOwner = nft.owner_of?.toLowerCase();
                        const contractOwner = moralisConfig.ownerAddress.toLowerCase();
                        if (nftOwner !== contractOwner) {
                            return (
                                <button
                                    onClick={() => doTransfer(nft)}
                                    key={idx}>
                                    轉換-{nft.token_id}
                                </button>
                            );
                        }
                        return null;
                    })
                )
            }
        </>
    );
};

export default NftTransfer;