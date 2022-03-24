import { useContext } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from "./ContractContext";

const FlipBlindBox = () => {
    const flipBlindBoxOptions = getWeb3ExecuteFunctionOption('flipBlindBoxOpened');
    const isBlindBoxOpenedOptions = getWeb3ExecuteFunctionOption('_isBlindBoxOpened');

    const {
        fetch,
        isFetching
    } = useWeb3ExecuteFunction();
    const {
        isBlindBoxOpened,
        setIsBlindBoxOpened
    } = useContext(ContractContext);

    const fetchIsFlipBlindBoxOpened = async () => {
        const res = await fetch({
            params: isBlindBoxOpenedOptions
        });

        if (typeof res === 'boolean') setIsBlindBoxOpened(res);
    };

    const sendFlipBlindBoxOpened = async () => {
        await fetch({
            params: flipBlindBoxOptions
        });
    };

    return (
        <div className={whiteCard}>
            <div>
                { isBlindBoxOpened !== undefined && (
                    <p className={`${blackTitle} uppercase`}>
                        IS BLIND BOX OPENED: {isBlindBoxOpened.toString()}
                    </p>
                )}

                <button
                    className={`${cyanBtn} mb-2`}
                    onClick={() => fetchIsFlipBlindBoxOpened()}
                    disabled={isFetching}
                >
                    Get blind box status
                </button>

                <button
                    className={cyanBtn}
                    onClick={() => sendFlipBlindBoxOpened()}
                    disabled={isFetching}
                >
                    Flip blind box status
                </button>
            </div>
        </div>
    );
};

export default FlipBlindBox;