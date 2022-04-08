import Moralis from 'moralis';
import { useContext, useEffect, useMemo } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { ContractContext } from 'src/Context/ContractContext';
import moralisConfig from "src/moralisConfig";

export const nullAddress = '0x0000000000000000000000000000000000000000';

const NftCollection = () => {
    const {
        data,
        error
    } = useNFTBalances();
    const {
        nfts,
        setNfts
    } = useContext(ContractContext);

    const matchedNfts = useMemo(() => {
        if (!data || !data.result) return [];
        const lowercaseContractAddr = moralisConfig.contractAddress.toLowerCase();
        return data.result.filter((nft) => {
            const lowercaseNftAddr = nft.token_address.toLowerCase();
            return lowercaseNftAddr === lowercaseContractAddr;
        });
    }, [data]);

    // useEffect(() => {
    //     if (account && isWeb3Enabled) {
    //         const options = {
    //             chain: moralisConfig.provider,
    //             address: account,
    //             token_address: moralisConfig.contractAddress
    //         };

    //         const fetch = async () => {
    //             const nfts = await Moralis.Web3API.account.getNFTsForContract(options);
    //             console.log(nfts);
    //         };

    //         fetch();
    //     }
    // }, [account, isWeb3Enabled]);

    useEffect(() => {
        console.log('=====matchedNfts=====');
        console.log(matchedNfts);
    }, [matchedNfts]);

    return (
        <div style={{ color: '#fff' }}>
            {
                matchedNfts.map((nft, idx) => (
                    <div key={idx}>
                        {nft.token_id}
                        <br />
                        {nft.token_address}
                    </div>
                ))
            }
        </div>
    );
};

export default NftCollection;