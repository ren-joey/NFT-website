import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { EventBus } from 'src/bus';
import { blackTitle, cyanBtn, whiteCard } from 'src/components/ui/uiClassName';
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from './ContractContext';

const MaxBalance = () => {
    const option = getWeb3ExecuteFunctionOption('maxBalance');

    const {
        data,
        fetch,
        isFetching
    }: any = useWeb3ExecuteFunction();

    const { maxBalance, setMaxBalance } = useContext(ContractContext);

    const fetchMaxBalance = async () => await fetch({ params: option });

    useEffect(() => {
        if (data) {
            setMaxBalance(data.toNumber());
        }
    }, [data]);

    return (
        <div className={whiteCard}>
            <div>
                { maxBalance && (
                    <p className={blackTitle}>
                        {`MAX BALANCE: ${maxBalance}`}
                    </p>
                ) }
                <button
                    className={cyanBtn}
                    onClick={() => fetchMaxBalance()}
                    disabled={ isFetching }
                >
                    get max balance
                </button>
            </div>
        </div>
    );
};

export default MaxBalance;