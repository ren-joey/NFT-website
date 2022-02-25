import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from './ContractContext';

const MintPrice = () => {
    const option = getWeb3ExecuteFunctionOption('mintPrice');

    const {
        data,
        error,
        fetch,
        isFetching,
        isLoading
    }: any = useWeb3ExecuteFunction();

    const { mintPrice, setMintPrice } = useContext(ContractContext);

    useEffect(() => {
        if (data) {
            setMintPrice(data.toNumber());
        }
    }, [data]);

    return (
        <div className="my-2 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex justify-center">
            <div>
                { mintPrice && (
                    <p className='text-lg font-medium text-gray-800'>
                        {`MINT PRICE: ${mintPrice}`}
                    </p>
                ) }
                <button
                    className="bg-cyan-700 rounded text-white px-2 py-1 ml-auto uppercase font-bold"
                    onClick={() => fetch({ params: option })}
                    disabled={ isFetching }
                >get mint price</button>
            </div>
        </div>
    );
};

export default MintPrice;