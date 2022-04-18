import axios from 'axios';
import { useContext, useEffect } from "react";
import { useNFTBalances, useWeb3ExecuteFunction } from "react-moralis";
import { ContractResponse } from 'src/@types/contract';
import { IMetadata } from 'src/@types/metadata';
import { ContractContext } from 'src/Context/ContractContext';
import moralisConfig from "src/moralisConfig";
import fetchContractVariable from './functions/fetchContractVariable';

const NftBalance = () => {
    const { data } = useNFTBalances({
        token_addresses: [moralisConfig.contractAddress]
    });
    const { fetch, isFetching } = useWeb3ExecuteFunction();
    const { nfts, setNfts } = useContext(ContractContext);

    useEffect(() => {
        if (data && data.result && !isFetching) {
            const _nfts = data.result.map((nft) => {
                fetchContractVariable<ContractResponse>({
                    paramName: 'tokenURI',
                    params: {
                        tokenId: '1'
                    },
                    fetch
                }).then((uri) => {
                    if (typeof uri === 'string') {
                        axios.get(uri).then((res) => {
                            nft.metadata = res.data as IMetadata;
                            nft.token_uri = uri;
                        });
                    }
                });
                return nft;
            });

            setNfts(_nfts);
        }
    }, [data]);

    return null;
};

export default NftBalance;