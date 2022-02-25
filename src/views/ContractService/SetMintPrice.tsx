import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from 'react-moralis';
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
        <div className="my-2 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex justify-center">
            <div className="flex">
                <input
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-bl"
                    value={inputMintPrice || 0}
                    type="number"
                    onChange={handleMintChange}
                ></input>
                <button
                    className="bg-cyan-700 rounded text-white px-2 py-1 ml-auto uppercase font-bold"
                    onClick={() => sendSetMintPrice()}
                    disabled={ isFetching }
                >set mint price</button>
            </div>
        </div>
    );
};

export default SetMintPrice;