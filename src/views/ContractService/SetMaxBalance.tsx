import { ChangeEvent, useContext, useState } from "react";
import { useWeb3ExecuteFunction } from 'react-moralis';
import { cyanBtn, whiteCard, whiteInput } from "src/components/ui/uiClassName";
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { nullable } from "../interfaces";
import { ContractContext } from "./ContractContext";

const SetMaxBalance = () => {
    const setMaxBalanceOptions = getWeb3ExecuteFunctionOption('setMaxBalance');
    const { maxBalance } = useContext(ContractContext);
    const {
        fetch,
        isFetching
    } = useWeb3ExecuteFunction();
    const [inputMaxBalance, setInputMaxBalance] = useState<nullable>(maxBalance);

    const handleMintChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMaxBalance(+e.target.value);
    };

    const sendSetMaxBalance = () => {
        fetch({
            params: {
                ...setMaxBalanceOptions,
                params: {"_maxBalance": inputMaxBalance}
            }
        });
    };

    return (
        <div className={whiteCard}>
            <div className="flex">
                <input
                    className={whiteInput}
                    value={inputMaxBalance || 0}
                    type="number"
                    onChange={handleMintChange}
                ></input>
                <button
                    className={cyanBtn}
                    onClick={() => sendSetMaxBalance()}
                    disabled={isFetching}
                >
                    set max balance
                </button>
            </div>
        </div>
    );
};

export default SetMaxBalance;