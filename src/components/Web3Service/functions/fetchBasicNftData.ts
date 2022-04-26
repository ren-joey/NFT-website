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

    // 所有 token_id 巡訪
    nfts.forEach((tokenId) => {
        promises.push(
            new Promise<BasicNft>((resolve) => {

                // 利用 Smart Contract 的 tokenURI method
                // 取得所有 token 的 metadata url
                fetchContractVariable<ContractResponse>({
                    paramName: 'tokenURI',
                    params: { tokenId },
                    fetch
                }).then((uri) => {
                    if (typeof uri === 'string') {

                        // 將取得的 metadata url 進行 get
                        // 得到的 json response 即為該 token_id 的 metadata 內容
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