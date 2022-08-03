import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { MoralisProvider } from 'react-moralis';
import { ContractContext } from 'src/Context/ContractContext';
import { BasicNft, INft } from 'src/@types/nft';
import { Nullable, NullableBigNumber } from 'src/@types/basicVariable';
import ethConfig from 'src/configs/ethConfig';
import PermissionCertification from 'src/components/Web3Service/PermissionCertification';

const Web3Provider = () => {
    const [getBalance, setGetBalance] = useState<NullableBigNumber>(null);
    const [MAX_SUPPLY, setMAX_SUPPLY] = useState<NullableBigNumber>(null);
    const [
        MAX_VIP_WHITE_LIST_SUPPLY,
        setMAX_VIP_WHITE_LIST_SUPPLY
    ] = useState<NullableBigNumber>(null);
    const [MAX_WHITE_LIST_SUPPLY, setMAX_WHITE_LIST_SUPPLY] = useState<NullableBigNumber>(null);
    const [totalSupply, setTotalSupply] = useState<NullableBigNumber>(null);
    const [mintPrice, setMintPrice] = useState<NullableBigNumber>(null);
    const mintPriceEth = useMemo<Nullable>(() => {
        if (!mintPrice) return null;
        const finney = mintPrice.div(BigNumber.from('1000000000000000'));
        const eth = finney.toNumber() / (10 ** 3);
        return eth;
    }, [mintPrice]);
    const [maxBalance, setMaxBalance] = useState<NullableBigNumber>(null);
    const [nfts, setNfts] = useState<(INft | BasicNft)[]>([]);
    const [allNfts, setAllNfts] = useState<(INft | BasicNft)[]>([]);
    const [isBlindBoxOpened, setIsBlindBoxOpened] = useState<(undefined|boolean)>(undefined);
    const [isVipWhiteList, setIsVipWhiteList] = useState<(undefined|boolean)>(undefined);
    const [isWhiteList, setIsWhiteList] = useState<undefined|boolean>(undefined);
    const [isSaleActive, setIsSaleActive] = useState(false);
    const [isWhiteListSaleActive, setIsWhiteListSaleActive] = useState(false);
    const [isVipWhiteListSaleActive, setIsVipWhiteListSaleActive] = useState(false);

    return (
        <MoralisProvider
            appId={ethConfig.appId}
            serverUrl={ethConfig.serverUrl}
        >
            <ContractContext.Provider
                value={{
                    getBalance,
                    setGetBalance,
                    MAX_SUPPLY,
                    setMAX_SUPPLY,
                    MAX_VIP_WHITE_LIST_SUPPLY,
                    setMAX_VIP_WHITE_LIST_SUPPLY,
                    MAX_WHITE_LIST_SUPPLY,
                    setMAX_WHITE_LIST_SUPPLY,
                    totalSupply,
                    setTotalSupply,
                    mintPrice,
                    setMintPrice,
                    mintPriceEth,
                    maxBalance,
                    setMaxBalance,
                    nfts,
                    setNfts,
                    allNfts,
                    setAllNfts,
                    isBlindBoxOpened,
                    setIsBlindBoxOpened,
                    isVipWhiteList,
                    setIsVipWhiteList,
                    isWhiteList,
                    setIsWhiteList,
                    isSaleActive,
                    setIsSaleActive,
                    isWhiteListSaleActive,
                    setIsWhiteListSaleActive,
                    isVipWhiteListSaleActive,
                    setIsVipWhiteListSaleActive
                }}
            >
                {/* mint 區塊 */}
                <PermissionCertification />
            </ContractContext.Provider>
        </MoralisProvider>
    );
};

export default Web3Provider;