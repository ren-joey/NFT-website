import { useContext } from "react";
import { NullableBigNumber } from "src/@types/basicVariable";
import { EventContext } from "src/Context/EventContext";
import BetamonStage from "./BetamonStage/BetamonStage";
import MintBlock from "./PurpleBlock/MintBlock";

const BlockSwitcher = ({ remain }: { remain: NullableBigNumber }) => {
    const {
        status,
        diff
    } = useContext(EventContext);

    switch(status) {
        case -1:
            if (diff > 604800000) {
                return (
                    <BetamonStage />
                );
            }
            return (
                <MintBlock remain={remain} />
            );
        case 0:
        case 1:
        case 2:
        case 3:
            return (
                <MintBlock remain={remain} />
            );
        default:
            return <></>;
    }
};

export default BlockSwitcher;