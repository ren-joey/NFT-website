import { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ContractResponse } from 'src/@types/contract';
import { ContractContext } from 'src/Context/ContractContext';
import fetchBasicNftData from './functions/fetchBasicNftData';
import fetchContractVariable from './functions/fetchContractVariable';

const NftBalance = () => {
    const { account } = useMoralis();
    // const { data } = useNFTBalances();
    const { fetch } = useWeb3ExecuteFunction();
    const { setNfts } = useContext(ContractContext);

    useEffect(() => {
        if (account) {
            fetchContractVariable<ContractResponse>({
                paramName: 'getBetamonByOwner',
                params: {
                    _owner: account
                },
                fetch
            }).then((nfts) => {
                if (Array.isArray(nfts)) {
                    fetchBasicNftData({
                        account,
                        fetch,
                        nfts
                    }).then((processedNfts) => {
                        setNfts(processedNfts);
                    });
                }
            });
        }
    }, [account]);

    // useEffect(() => {
    //     if (data && data.result && !isFetching) {
    //         console.log(data);
    //         const _nfts = data.result.map((nft) => {
    //             fetchContractVariable<ContractResponse>({
    //                 paramName: 'tokenURI',
    //                 params: {
    //                     tokenId: '1'
    //                 },
    //                 fetch
    //             }).then((uri) => {
    //                 if (typeof uri === 'string') {
    //                     axios.get(uri).then((res) => {
    //                         nft.metadata = res.data as IMetadata;
    //                         nft.token_uri = uri;
    //                     });
    //                 }
    //             });
    //             return nft;
    //         });

    //         setNfts(_nfts);
    //     }
    // }, [data]);

    return null;
};

export default NftBalance;