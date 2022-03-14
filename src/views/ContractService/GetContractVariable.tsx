import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { EventBus } from 'src/bus';
import { capitalizeFirstLetter } from 'src/functions/capitalizeFirstLetter';
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from './ContractContext';

interface IProps {
    methodName: string
}

const GetContractVariable = ({ methodName }: IProps) => {
    const option = getWeb3ExecuteFunctionOption(methodName);
    const capitalizedMethodName = capitalizeFirstLetter(methodName);

    const {
        data,
        fetch
    }: any = useWeb3ExecuteFunction();

    const contractContext = useContext(ContractContext);
    const setVariable = contractContext[`set${capitalizedMethodName}`];

    const fetchVariable = async () => await fetch({ params: option });

    EventBus.$on(
        `fetch${capitalizedMethodName}`,
        () => new Promise<void>(async (res) => {
            const value = await fetchVariable();
            res(value);
        })
    );

    useEffect(() => {
        if (data) {
            setVariable(data.toNumber());
        }
    }, [data]);

    return (
        null
    );
};

export default GetContractVariable;