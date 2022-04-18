import { useContext } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { INft } from "src/@types/nft";
import { ContractContext } from "src/Context/ContractContext";
import moralisConfig from "src/moralisConfig";
import fetchContractVariable from "./functions/fetchContractVariable";

const NftTransfer = () => {
    const { fetch } = useWeb3ExecuteFunction();
    const { nfts } = useContext(ContractContext);

    const doTransfer = (nft: INft) => {
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
                    nfts.map((nft, idx) => (
                        <button
                            onClick={() => doTransfer(nft)}
                            key={idx}>
                            轉換-{nft.token_id}
                        </button>
                    ))
                )
            }
        </>
    );
};

export default NftTransfer;