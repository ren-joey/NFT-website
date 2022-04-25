import axios from "axios";
import { ContractResponse, MoralisFetch } from "src/@types/contract";
import { IMetadata } from "src/@types/metadata";
import { BasicNft } from "src/@types/nft";
import fetchContractVariable from "./fetchContractVariable";

interface Props {
    nfts: string[],
    fetch: MoralisFetch,
    account: string
}

const fetchBasicNftData = (
    { nfts, account, fetch }: Props
) => new Promise<BasicNft[]>((allDone) => {
    const promises: Promise<BasicNft>[] = [];
    nfts.forEach((tokenId) => {
        promises.push(
            new Promise<BasicNft>((resolve) => {
                fetchContractVariable<ContractResponse>({
                    paramName: 'tokenURI',
                    params: { tokenId },
                    fetch
                }).then((uri) => {
                    if (typeof uri === 'string') {
                        axios.get(uri).then((res) => {
                            resolve({
                                token_id: tokenId.toString(),
                                metadata: res.data as IMetadata,
                                owner_of: account
                            });
                        });
                    }
                });
            })
        );
    });
    Promise.all(promises).then((processedNfts) => {
        allDone(processedNfts);
    });
});

export default fetchBasicNftData;