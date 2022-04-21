import { BigNumber } from "ethers";
import { useContext, useMemo } from "react";
import { NullableBigNumber } from "src/@types/basicVariable";
import { ContractContext } from "src/Context/ContractContext";
import { EventContext } from "src/Context/EventContext";
import { getParameterByName } from "src/utils";
import BetamonStage from "./BetamonStage/BetamonStage";
import MintBlock from "./PurpleBlock/MintBlock";
import TimeArea from "./PurpleBlock/TimeArea";

const RemainProvider = () => {
    const {
        MAX_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        totalSupply
    } = useContext(ContractContext);

    const { status, diff } = useContext(EventContext);

    const _totalSupply = getParameterByName('totalSupply'); // [DEV]

    const remain = useMemo<NullableBigNumber>(() => {
        if (_totalSupply) return BigNumber.from(_totalSupply);

        if (totalSupply === null
            || MAX_VIP_WHITE_LIST_SUPPLY === null
            || MAX_WHITE_LIST_SUPPLY === null
            || MAX_SUPPLY === null) return null;

        let _remain = BigNumber.from(0);
        switch (status) {
            case -1:
            case 0:
                _remain = MAX_VIP_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 1:
                _remain = MAX_WHITE_LIST_SUPPLY.sub(totalSupply);
                break;
            case 2:
            case 3:
                _remain = MAX_SUPPLY.sub(totalSupply);
                break;
            default:
                _remain = BigNumber.from(0);
        }
        return _remain.lt(0) ? BigNumber.from(0) : _remain;
    }, [
        MAX_SUPPLY,
        MAX_WHITE_LIST_SUPPLY,
        MAX_VIP_WHITE_LIST_SUPPLY,
        totalSupply,
        status
    ]);

    return (
        <>
            {/* mint 區塊 */}
            {
                status === -1 && diff > 604800000
                    ? (
                        <BetamonStage />
                    ) : (
                        <MintBlock remain={remain} />
                    )
            }

            {/* 時間及倒數區塊 */}
            <TimeArea remain={remain} />
        </>
    );
};

export default RemainProvider;