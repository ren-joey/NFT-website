import { useState } from "react";
import { NullableBigNumber } from "src/@types/basicVariable";
import CoverBoard from "./CoverBoard";
import MainBoard from "./MainBoard";

export type ExchangePageName = 'cover' | 'main';

const ExchangeBlock = () => {
    const [exchangePage, setExchangePage] = useState<ExchangePageName>('cover');

    if (exchangePage === 'cover') {
        return <CoverBoard setExchangePage={setExchangePage} />;
    } else if (exchangePage === 'main') {
        return <MainBoard />;
    }
    return (null);
};

export default ExchangeBlock;