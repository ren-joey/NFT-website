import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { EventBus } from 'src/bus';
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from './ContractContext';

const MaxBalance = () => {
    const option = getWeb3ExecuteFunctionOption('maxBalance');

    const {
        data,
        fetch
    }: any = useWeb3ExecuteFunction();

    const { setMaxBalance } = useContext(ContractContext);

    const fetchMaxBalance = async () => await fetch({ params: option });

    EventBus.$on(
        'fetchMaxBalance',
        () => new Promise<void>(async (res) => {
            const price = await fetchMaxBalance();
            res(price);
        })
    );

    useEffect(() => {
        if (data) {
            setMaxBalance(data.toNumber());
        }
    }, [data]);

    return (
        null
    );
};

export default MaxBalance;