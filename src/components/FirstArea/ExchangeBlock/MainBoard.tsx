import NftList from "./NftList";
import Planet from "./Planet";
import 'src/components/FirstArea/ExchangeBlock/MainBoard.scss' ;
import { useMemo, useState } from "react";
import { StableNftOption } from "src/@types/nft";

const MainBoard = () => {
    const [ stableNfts, setStableNfts ] = useState<StableNftOption[]>([]);
    const selectedNftAmount = useMemo(() => {
        let amount = 0;
        for (let i = 0; i < stableNfts.length; i++) {
            if (stableNfts[i].select === true) amount += 1;
        }
        return amount;
    }, [stableNfts]);

    return (
        <div className="main-board">
            <NftList
                selectedNftAmount={selectedNftAmount}
                setStableNfts={setStableNfts}
                stableNfts={stableNfts}
            />
            <Planet />
        </div>
    );
};

export default MainBoard;