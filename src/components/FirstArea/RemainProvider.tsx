import { BigNumber } from "ethers";
import React, { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Nullable, NullableBigNumber } from "src/@types/basicVariable";
import { ContractContext } from "src/Context/ContractContext";
import { EventContext } from "src/Context/EventContext";
import { getParameterByName } from "src/utils";
import TimeArea from "./PurpleBlock/TimeArea";

const SupplyRemainProvider = () => {
    const {
        MAX_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        totalSupply
    } = useContext(ContractContext);

    const { status, diff } = useContext(EventContext);

    const _totalSupply = getParameterByName('totalSupply'); // [DEV]

    const supplyRemain = useMemo<NullableBigNumber>(() => {
        if (_totalSupply) return BigNumber.from(_totalSupply);

        if (totalSupply === null
            || MAX_VIP_WHITE_LIST_SUPPLY === null
            || MAX_WHITE_LIST_SUPPLY === null
            || MAX_SUPPLY === null) return null;

        let remain = BigNumber.from(0);
        switch (status) {
            case -1:
            case 0:
                remain = MAX_VIP_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 1:
                remain = MAX_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 2:
            case 3:
                remain = MAX_SUPPLY.sub(totalSupply);
                break;
            default:
                remain = BigNumber.from(0);
        }
        return remain.lt(0) ? BigNumber.from(0) : remain;
    }, [
        MAX_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        totalSupply,
        status
    ]);

    const prevStatus = useRef<Nullable>(null);
    const [displayDom, setDisplayDom] = useState<null|JSX.Element>(null);

    // Lazy Loading
    const BetamonStage = React.lazy(() => import('./BetamonStage/BetamonStage'));
    const PurpleBlock = React.lazy(() => import('./PurpleBlock/PurpleBlock'));
    const ExchangeBlock = React.lazy(() => import('./ExchangeBlock/ExchangeBlock'));
    useEffect(() => {
        if (status !== prevStatus.current) {
            prevStatus.current = status;

            // 活動尚未開始且距離開始時間七天以上
            if (status === -1 && diff > (7 * 24 * 60 * 60 * 1000)) {
                setDisplayDom(<BetamonStage />);
            } else if (status <= 3) {
                setDisplayDom(<PurpleBlock supplyRemain={supplyRemain} />);
            } else if (status === 4) {
                setDisplayDom(<ExchangeBlock />);
            } else {
                setDisplayDom(<BetamonStage />);
            }
        }
    }, [status]);

    return (
        <>
            {/* mint 區塊 */}
            <Suspense fallback={<></>}>
                { displayDom }
            </Suspense>

            {/* 時間及倒數區塊 */}
            <TimeArea supplyRemain={supplyRemain} />
        </>
    );
};

export default SupplyRemainProvider;