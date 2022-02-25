import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const TotalSupply = ({ fetchContract }: any) => {
    const totalSupplyOptions = getWeb3ExecuteFunctionOption('getTotalSupply');

    const {
        data,
        error,
        fetch,
        isFetching,
        isLoading
    }: any = useWeb3ExecuteFunction();

    return (
        <div className="my-2 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex justify-center">
            <div>
                {
                    data && (
                        <p className="text-lg font-medium text-gray-800">
                            { `TOTAL SUPPLY: ${data}` }
                        </p>
                    )
                }
                <button
                    className="bg-cyan-700 rounded text-white px-2 py-1 ml-auto uppercase font-bold"
                    onClick={() => fetch({ params: totalSupplyOptions })}
                    disabled={ isFetching }
                >
                    get total supply
                </button>
            </div>
        </div>
    );
};

export default TotalSupply;