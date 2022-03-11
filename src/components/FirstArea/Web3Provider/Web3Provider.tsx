import { useMemo, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { ContractContext } from "src/views/ContractService/ContractContext";
import { INft, nullable } from "src/views/interfaces";
import moralisConfig from "src/views/moralisConfig";
import PermissionCertification from "src/views/PermissionCertification";

const Web3Provider = () => {
    const [totalSupply, setTotalSupply] = useState<nullable>(null);
    const [mintPrice, setMintPrice] = useState<nullable>(null);
    const mintPriceEth = useMemo<nullable>(() => {
        if (!mintPrice) return null;
        const eth = mintPrice / (10 ** 18);
        return eth;
    }, [mintPrice]);
    const [maxBalance, setMaxBalance] = useState<nullable>(null);
    const [nfts, setNfts] = useState<INft[]>([]);
    const [isBlindBoxOpened, setIsBlindBoxOpened] = useState<(undefined|boolean)>(undefined);
    const [isVipWhiteList, setIsVipWhiteList] = useState<(undefined|boolean)>(undefined);
    const [isWhiteList, setIsWhiteList] = useState<undefined|boolean>(undefined);
    const [isSaleActive, setIsSaleActive] = useState(false);
    const [isWhiteListSaleActive, setIsWhiteListSaleActive] = useState(false);
    const [isVipWhiteListSaleActive, setIsVipWhiteListSaleActive] = useState(false);



    return (
        <MoralisProvider
            appId={moralisConfig.appId}
            serverUrl={moralisConfig.serverUrl}
        >
            <ContractContext.Provider value={{
                totalSupply,
                setTotalSupply,
                mintPrice,
                setMintPrice,
                mintPriceEth,
                maxBalance,
                setMaxBalance,
                nfts,
                setNfts,
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
            }}>
                {/* mint 區塊 */}
                <PermissionCertification />
            </ContractContext.Provider>
        </MoralisProvider>
    );
};

export default Web3Provider;