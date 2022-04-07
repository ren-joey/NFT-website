import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { ContractContext } from "src/Context/ContractContext";
import { INft } from "src/interfaces/nft";
import { nullable, nullableBigNumber } from "src/interfaces/types";
import moralisConfig from "src/moralisConfig";
import PermissionCertification from "src/components/Web3Service/PermissionCertification";

const Web3Provider = () => {
    const [getBalance, setGetBalance] = useState<nullableBigNumber>(null);
    const [MAX_SUPPLY, setMAX_SUPPLY] = useState<nullableBigNumber>(null);
    const [
        MAX_VIP_WHITE_LIST_SUPPLY,
        setMAX_VIP_WHITE_LIST_SUPPLY
    ] = useState<nullableBigNumber>(null);
    const [MAX_WHITE_LIST_SUPPLY, setMAX_WHITE_LIST_SUPPLY] = useState<nullableBigNumber>(null);
    const [totalSupply, setTotalSupply] = useState<nullableBigNumber>(null);
    const [mintPrice, setMintPrice] = useState<nullableBigNumber>(null);
    const mintPriceEth = useMemo<nullable>(() => {
        if (!mintPrice) return null;
        const finney = mintPrice.div(BigNumber.from('1000000000000000'));
        const eth = finney.toNumber() / (10 ** 3);
        return eth;
    }, [mintPrice]);
    const [maxBalance, setMaxBalance] = useState<nullableBigNumber>(null);
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
                {/* mint 區塊 */}
                <PermissionCertification />
            </ContractContext.Provider>
        </MoralisProvider>
    );
};

export default Web3Provider;