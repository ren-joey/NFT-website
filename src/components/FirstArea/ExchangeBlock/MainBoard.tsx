import NftList from './NftList';
import Planet from './Planet';
import 'src/components/FirstArea/ExchangeBlock/MainBoard.scss' ;
import { useMemo, useState } from 'react';
import { StableNftOption } from 'src/@types/nft';
import ExchangeAlertController from './ExchangeAlertController';

const MainBoard = () => {
    const [ stableNfts, setStableNfts ] = useState<StableNftOption[]>([]);
    const selectedNfts = useMemo(() => {
        const nfts = stableNfts.filter((nft => nft.select === true));
        return nfts;
    }, [stableNfts]);

    return (
        <div className="main-board">
            <NftList
                selectedNftAmount={selectedNfts.length}
                setStableNfts={setStableNfts}
                stableNfts={stableNfts}
            />
            <Planet />
            <ExchangeAlertController
                selectedNfts={selectedNfts}
            />
        </div>
    );
};

export default MainBoard;