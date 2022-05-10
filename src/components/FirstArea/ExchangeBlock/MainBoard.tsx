import NftList from "./NftList";
import Planet from "./Planet";
import 'src/components/FirstArea/ExchangeBlock/MainBoard.scss' ;
import { useMemo, useState } from "react";
import { StableNftOption } from "src/@types/nft";
import { ExchangeAlertState } from "src/@types/viewVariables";

const MainBoard = () => {
    const [ stableNfts, setStableNfts ] = useState<StableNftOption[]>([]);
    const [ alertState, setAlertState ] = useState<ExchangeAlertState>({
        enable: false,
        type: 'faq'
    });
    const setAlert = ({
        type,
        alertData = undefined,
        stableNfts = undefined
    }: Omit<
        ExchangeAlertState,
        'enable'
    >) => {
        const defaultState = {
            enable: true,
            type
        };

        // 當彈窗設定為 basic 且 type 為 form 時，data 必須有資料
        if (type === 'basic' && alertState !== undefined) {
            setAlertState({
                ...defaultState,
                alertData
            });
        } else if (type === 'faq') {
            setAlertState(defaultState);
        } else if (type === 'form' && stableNfts !== undefined) {
            setAlert({
                ...defaultState,
                stableNfts
            });
        }
    };
    const disableAlert = () => {
        setAlertState({
            enable: true,
            type: 'faq'
        });
    };
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
                disableAlert={disableAlert}
                setAlert={setAlert}
            />
            <Planet />
        </div>
    );
};

export default MainBoard;