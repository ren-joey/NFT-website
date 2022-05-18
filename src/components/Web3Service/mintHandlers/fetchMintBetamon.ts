import { BigNumber } from "ethers";
import { getWeb3ExecuteFunctionOption } from "src/components/Web3Service/functions/contractAbi";
import enableGlobalAlert from "src/functions/enableGlobalAlert";
import moralisConfig from "src/configs/moralisConfig";
import { IMintAlertHandler } from "./mintAlertHandler";

const fetchMintBetamon = ({
    mintMethodName,
    amount,
    mintPrice,
    fetch,
    lang
}: Pick<
    IMintAlertHandler,
    'amount'|'mintPrice'|'mintMethodName'|'lang'|'fetch'
>
) => new Promise<void>((res) => {
    if (mintPrice === null) return;

    const doFetch = async (price: BigNumber) => {
        const mintBetamonOptions = getWeb3ExecuteFunctionOption(mintMethodName);

        const result: any = await fetch({
            params: {
                ...mintBetamonOptions,
                msgValue: price.toString(),
                params: {
                    numBetamon: amount
                }
            }
        });

        if (result !== undefined) {
            enableGlobalAlert({
                content: lang.MINTED_ALERT,
                btnList: [
                    {
                        text: lang.MINTED_ALERT_BTN,
                        onClick: () => {
                            window.open(`${moralisConfig.etherscanUrl}${result.hash}`, '_blank');
                        }
                    }
                ]
            });
        }

        res();
    };

    doFetch(mintPrice.mul(amount));
});

export default fetchMintBetamon;