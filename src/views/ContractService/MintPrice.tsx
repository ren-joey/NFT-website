import { useContext, useEffect } from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { EventBus } from 'src/bus';
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

    const fetchMintPrice = async () => await fetch({ params: option });

    EventBus.$on(
        'fetchMintPrice',
        () => new Promise<void>(async (res) => {
            const price = await fetchMintPrice();
            res(price);
        })
    );

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
                    onClick={() => fetchMintPrice()}
                    disabled={ isFetching }
                >
                    get mint price
                </button>
            </div>
        </div>
    );
};

export default MintPrice;