import axios from "axios";
import Moralis from "moralis";
import { INft } from "../interfaces";
import moralisConfig from "../moralisConfig";

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

    return nfts;
};

const refreshNft = async ({
    token_address,
    token_id
}: INft) => {
    // { address: "0xd...07", token_id: "1", flag: "metadata" };
    const option: any = {
        address: token_address,
        token_id: token_id,
        chain: moralisConfig.provider,
        flag: 'uri'
    };
    await Moralis.Web3API.token.reSyncMetadata(option);
};

export {
    fetchMetadata,
    refreshNft
};