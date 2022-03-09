import { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import NftDisplay from "./NftService/NftDisplay";
import UserBalance from "./UserService/UserBalance";
import Web3ContractService from "./Web3ContractService";

type SaleStatusStr = 'isSaleActive'|'isWhiteListSaleActive'|'isVipWhiteListSaleActive'

const PermissionCertification = () => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3
    } = useMoralis();

    const {
        isVipWhiteList,
        setIsVipWhiteList,
        isWhiteList,
        setIsWhiteList,
        isSaleActive,
        setIsSaleActive,
        isVipWhiteListSaleActive,
        setIsVipWhiteListSaleActive,
        isWhiteListSaleActive,
        setIsWhiteListSaleActive
    } = useContext(ContractContext);

    const {
        fetch,
        isFetching
    } = useWeb3ExecuteFunction();

    const fetchSaleStatus = (paramName: SaleStatusStr) => new Promise<boolean>((resolve) => {
        const option = getWeb3ExecuteFunctionOption(`_${paramName}`);
        fetch({ params: option }).then((result) => {
            resolve(result as boolean);
        });
    });

    useEffect(() => {
        if (isWeb3Enabled === true) {
            fetchSaleStatus('isVipWhiteListSaleActive').then((res) => {
                setIsVipWhiteListSaleActive(res);
            });

            fetchSaleStatus('isWhiteListSaleActive').then((res) => {
                setIsWhiteListSaleActive(res);
            });

            fetchSaleStatus('isSaleActive').then((res) => {
                setIsSaleActive(res);
            });
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (isAuthenticated) {
            try {
                enableWeb3();
            } catch (e) {
                console.log('Web3ContractService error:'); // [DEV]
                console.log(e);
            }
        }
    }, [isAuthenticated]);

    const advertisingContent = () => {
        let content = 'VBC Betamon 尚未開賣';
        if (isSaleActive) content = 'NFT 已經開賣囉！\n趕快搶購！';
        else if (isWhiteListSaleActive) content = '白名單早鳥階段已經開跑！\n請驗證身份後進行搶購。';
        else if (isVipWhiteListSaleActive) content = 'VIP白名單早鳥階段已經開跑！\n請驗證身份後進行搶購。';

        // TODO: 身份驗證開發

        return (
            <div className={blackTitle}>
                { content }
                <br />
                { (isWhiteListSaleActive || isVipWhiteListSaleActive) && (
                    <button className={cyanBtn}>
                        立即驗證身份
                    </button>
                ) }
            </div>
        );
    };

    return (
        <div className="permission-certification">
            <UserBalance />
            {
                isAuthenticated && (
                    <div className={whiteCard}>
                        { advertisingContent() }

                        {/* <Web3ContractService />
                        <NftDisplay /> */}
                    </div>
                )
            }
        </div>
    );
};

export default PermissionCertification;