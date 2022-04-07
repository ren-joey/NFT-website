import { moralisFetch } from "src/components/Web3Service/mintHandlers/mintAlertHandler";
import { getWeb3ExecuteFunctionOption } from "../../../contractAbi";
import { contractVariables } from "./getContractContextSetter";

export interface IFetchContractVariable {
    paramName: contractVariables,
    params?: any,
    fetch: moralisFetch
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