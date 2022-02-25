import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from 'react-moralis';
import { cyanBtn, whiteCard, whiteInput } from "src/components/ui/uiClassName";
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { nullable } from "../interfaces";
import { ContractContext } from "./ContractContext";

const SetMintPrice = () => {
    const setMintPriceOptions = getWeb3ExecuteFunctionOption('setMintPrice');
    const { mintPrice } = useContext(ContractContext);
    const {
        fetch,
        isFetching
    } = useWeb3ExecuteFunction();
    const [inputMintPrice, setInputMintPrice] = useState<nullable>(mintPrice);

    const handleMintChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMintPrice(+e.target.value);
    };

    const sendSetMintPrice = () => {
        fetch({
            params: {
                ...setMintPriceOptions,
                params: {"_mintPrice": inputMintPrice}
            }
        });
    };

    return (
        <div className={whiteCard}>
            <div className="flex">
                <input
                    className={whiteInput}
                    value={inputMintPrice || 0}
                    type="number"
                    onChange={handleMintChange}
                ></input>
                <button
                    className={cyanBtn}
                    onClick={() => sendSetMintPrice()}
                    disabled={isFetching}
                >
                    set mint price
                </button>
            </div>
        </div>
    );
};

export default SetMintPrice;