import { useContext, useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { ContractResponse } from 'src/@types/contract';
import { EventBus } from 'src/bus';
import { ContractContext } from 'src/Context/ContractContext';
import fetchBasicNftData from './functions/fetchBasicNftData';
import fetchContractVariable from './functions/fetchContractVariable';

const useNftBalance = () => {
    const {
        account,
        isAuthenticated,
        isWeb3Enabled
    } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const { setNfts } = useContext(ContractContext);
    const [fetching, setFetching] = useState(false);

    const getNftBalance = () => {
        if (!account || fetching === true) return;
        setFetching(true);

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
                }).finally(() => {
                    setFetching(false);
                });
            } else setFetching(false);
        }).catch(() => {
            setFetching(false);
        });
    };

    useEffect(() => {
        if (account && isAuthenticated && isWeb3Enabled) {
            setTimeout(getNftBalance, 200);
        }
    }, [account, isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        EventBus.$on('get-nft-balance', getNftBalance);
    }, []);

    return {
        fetching
    };
};

export default useNftBalance;