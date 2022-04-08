import { ContractVariables, MoralisFetch } from "src/@types/contract";
import { getWeb3ExecuteFunctionOption } from "src/contractAbi";

export interface IFetchContractVariable {
    paramName: ContractVariables,
    params?: any,
    fetch: MoralisFetch
}

function fetchContractVariable<T>({
    paramName,
    params = undefined,
    fetch
}: IFetchContractVariable): Promise<T> {
    return new Promise<T>((resolve) => {
        let option = getWeb3ExecuteFunctionOption(paramName);
        if (params) option = { ...option, params };
        fetch({ params: option }).then((result) => {
            resolve(result as T);
        });
    });
}

export default fetchContractVariable;