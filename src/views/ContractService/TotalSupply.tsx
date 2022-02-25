import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { useWeb3ExecuteFunction } from "react-moralis";
import { blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";

const TotalSupply = ({ fetchContract }: any) => {
    const totalSupplyOptions = getWeb3ExecuteFunctionOption('getTotalSupply');

    const {
        data,
        fetch,
        isFetching
    }: any = useWeb3ExecuteFunction();

    return (
        <div className={whiteCard}>
            <div>
                {
                    data && (
                        <p className={blackTitle}>
                            { `TOTAL SUPPLY: ${data}` }
                        </p>
                    )
                }
                <button
                    className={cyanBtn}
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