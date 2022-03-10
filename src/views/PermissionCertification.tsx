import React, { useContext, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import { blackDescription, blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { getWeb3ExecuteFunctionOption } from "./contractAbi";
import { ContractContext } from "./ContractService/ContractContext";
import MaxBalance from "./ContractService/MaxBalance";
import MintBetamon from "./ContractService/MintBetamon";
import MintPrice from "./ContractService/MintPrice";
import NftDisplay from "./NftService/NftDisplay";
import UserBalance from "./UserService/UserBalance";
import Web3ContractService from "./Web3ContractService";

const videoContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '-10%',
    left: '-10%',
    width: '120%',
    height: '120%',
    pointerEvents: 'none',
    opacity: 0.65,
    zIndex: '-1'
};

const PermissionCertification = () => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3,
        account
    } = useMoralis();

    const {
        isVipWhiteList,
        setIsVipWhiteList,
        isWhiteList, // 沒用到，找時間刪除
        setIsWhiteList, // 沒用到，找時間刪除
        isSaleActive, // 沒用到，找時間刪除
        setIsSaleActive,
        isVipWhiteListSaleActive,
        setIsVipWhiteListSaleActive,
        isWhiteListSaleActive,
        setIsWhiteListSaleActive
    } = useContext(ContractContext);

    const {
        fetch
    } = useWeb3ExecuteFunction();

    const fetchContractVariable = (
        paramName: string,
        params: any = undefined
    ) => new Promise<boolean>((resolve) => {
        let option = getWeb3ExecuteFunctionOption(paramName);
        if (params) option = { ...option, params };
        fetch({ params: option }).then((result) => {
            resolve(result as boolean);
        });
    });

    const fetchWhiteListAuthentication = () => {
        let paramName = '';
        if (isVipWhiteListSaleActive) paramName = 'vipWhiteList';
        else if (isWhiteListSaleActive) paramName = 'whiteList';

        fetchContractVariable(paramName).then((res) => {
            console.log(res);
            if (isVipWhiteListSaleActive) setIsVipWhiteList(res);
            else if (isWhiteListSaleActive) setIsWhiteList(res);
        });
    };

    useEffect(() => {
        if (isWeb3Enabled === true) {
            EventBus.$emit('fetchMintPrice');
            EventBus.$emit('fetchMaxBalance');

            fetchContractVariable('_isVipWhiteListSaleActive').then((res) => {
                setIsVipWhiteListSaleActive(res);
            });

            fetchContractVariable('_isWhiteListSaleActive').then((res) => {
                setIsWhiteListSaleActive(res);
            });

            fetchContractVariable('_isSaleActive').then((res) => {
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
        else if (isWhiteListSaleActive) content = '白名單早鳥階段已經開始！';
        else if (isVipWhiteListSaleActive) content = 'VIP白名單早鳥階段已經開始！';

        return (
            <div className={blackTitle}>
                { content }
                {/* <br />
                { ((isWhiteListSaleActive && isWhiteList === undefined)
                    || (isVipWhiteListSaleActive && isVipWhiteList === undefined)) ? (
                        <button
                            className={cyanBtn}
                            onClick={() => fetchWhiteListAuthentication()}
                        >
                            立即驗證身份
                        </button>
                    ) : (
                        <div className={blackDescription}>
                            很抱歉，您不符合早鳥資格
                        </div>
                    ) } */}
            </div>
        );
    };

    const mintCard = () => {
        if (!isWeb3Enabled) return false;
        else if (isSaleActive) return <MintBetamon />;
        else if (isWhiteListSaleActive) return <MintBetamon mintMethodName={'whiteListMintBetamon'} />;
        else if (isVipWhiteListSaleActive) return <MintBetamon mintMethodName={'vipWhiteListMintBetamon'} />;
        return false;
    };

    return (
        <div className="permission-certification min-h-screen flex flex-col items-center justify-center">
            <UserBalance />
            <MintPrice />
            <MaxBalance />
            {
                isAuthenticated && (
                    isWeb3Enabled ? (
                        <>
                            <div className={whiteCard}>
                                { advertisingContent() }
                                {/* <Web3ContractService /> */}
                            </div>

                            { mintCard() }

                            <NftDisplay />
                        </>
                    ) : (
                        <div className={whiteCard}>
                            <div className={blackTitle}>
                                請確認您的 Metamask 錢包連線狀態
                            </div>
                        </div>
                    )
                )
            }

            <div className="video-container" style={videoContainerStyle}>
                <iframe src="https://www.youtube.com/embed/IWVJq-4zW24?controls=0&autoplay=1&mute=1" title="YouTube video player" width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    );
};

export default PermissionCertification;