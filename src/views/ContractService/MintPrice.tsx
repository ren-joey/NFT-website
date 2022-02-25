import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { blackTitle, cyanBtn, whiteCard } from 'src/components/ui/uiClassName';
import { getWeb3ExecuteFunctionOption } from "../contractAbi";
import { ContractContext } from './ContractContext';

const MintPrice = () => {
    const option = getWeb3ExecuteFunctionOption('mintPrice');

    const {
        data,
        fetch,
        isFetching
    }: any = useWeb3ExecuteFunction();

    const { mintPrice, setMintPrice } = useContext(ContractContext);

    useEffect(() => {
        if (data) {
            setMintPrice(data.toNumber());
        }
    }, [data]);

    return (
        <div className={whiteCard}>
            <div>
                { mintPrice && (
                    <p className={blackTitle}>
                        {`MINT PRICE: ${mintPrice}`}
                    </p>
                ) }
                <button
                    className={cyanBtn}
                    onClick={() => fetch({ params: option })}
                    disabled={ isFetching }
                >
                    get mint price
                </button>
            </div>
        </div>
    );
};

export default MintPrice;