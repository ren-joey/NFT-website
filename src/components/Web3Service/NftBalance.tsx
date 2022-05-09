import { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ContractResponse } from 'src/@types/contract';
import { ContractContext } from 'src/Context/ContractContext';
import fetchBasicNftData from './functions/fetchBasicNftData';
import fetchContractVariable from './functions/fetchContractVariable';



const NftBalance = () => {
    const { account } = useMoralis();
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

    return (null);
};

export default NftBalance;