import all from 'gsap-trial/src/all';
import Moralis from 'moralis';
import { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ContractVariables } from 'src/@types/contract';
import { INft } from 'src/@types/nft';
import { ContractContext } from 'src/Context/ContractContext';
import moralisConfig from "src/configs/moralisConfig";
import fetchContractVariable from './functions/fetchContractVariable';

const NftCollection = () => {
    const { isAuthenticated, isWeb3Enabled } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const { setAllNfts } = useContext(ContractContext);

    const fetchAllNfts = async () => {
        const polygonNfts = await Moralis.Web3API.token.getAllTokenIds({
            address: moralisConfig.contractAddress,
            chain: moralisConfig.provider
        });
        if (!polygonNfts || !polygonNfts.result) return;

        const _nfts = polygonNfts.result;
        const nfts: INft[] = [];

        const paramName: ContractVariables = 'ownerOf';
        const allPromises = [];
        for (let i = 0; i < _nfts.length; i++) {
            const { token_id } = _nfts[i];
            allPromises.push(fetchContractVariable<string | undefined>({
                paramName,
                fetch,
                params: {
                    tokenId: token_id
                }
            }));
        }

        Promise.all(allPromises).then((addresses) => {
            for (let i = 0; i < _nfts.length; i++) {
                nfts.push({
                    ..._nfts[i],
                    owner_of: addresses[i]
                });
            }
        });
        setAllNfts(nfts);
    };

    useEffect(() => {
        if (isAuthenticated && isWeb3Enabled) fetchAllNfts();
    }, [ isAuthenticated, isWeb3Enabled ]);

    return null;
};

export default NftCollection;