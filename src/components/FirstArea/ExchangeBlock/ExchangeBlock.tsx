import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { NullableBigNumber } from "src/@types/basicVariable";
import CoverBoard from "./CoverBoard";
import MainBoard from "./MainBoard";

export type ExchangePageName = 'cover' | 'main';

const ExchangeBlock = () => {
    // const [exchangePage, setExchangePage] = useState<ExchangePageName>('cover');

    const {
        isWeb3Enabled,
        isAuthenticated
    } = useMoralis();

    // useEffect(() => {
    //     console.log(isWeb3Enabled, isAuthenticated);
    //     if (isWeb3Enabled && isAuthenticated) {
    //         setExchangePage('main');
    //     } else setExchangePage('cover');
    // }, [isWeb3Enabled, isAuthenticated]);

    if (!isAuthenticated || !isWeb3Enabled) {
        return <CoverBoard />;
    } else return <MainBoard />;
};

export default ExchangeBlock;