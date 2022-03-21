import moralisConfig from "./moralisConfig";
import { MoralisProvider } from "react-moralis";
import { ContractContext } from "./ContractService/ContractContext";
import { useMemo, useState } from "react";
import { INft, nullable } from "./interfaces";
import PermissionCertification from "./PermissionCertification";

const web3Style: React.CSSProperties = {color: '#fff'};

const Web3Component = () => {
    const [getBalance, setGetBalance] = useState<nullable>(null);
    const [MAX_SUPPLY, setMAX_SUPPLY] = useState<nullable>(null);
    const [MAX_VIP_WHITE_LIST_SUPPLY, setMAX_VIP_WHITE_LIST_SUPPLY] = useState<nullable>(null);
    const [MAX_WHITE_LIST_SUPPLY, setMAX_WHITE_LIST_SUPPLY] = useState<nullable>(null);
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
                <div style={web3Style}>
                    {/* <PermissionCertification /> */}
                </div>
            </ContractContext.Provider>
        </MoralisProvider>
    );
};

export default Web3Component;