import { BigNumber } from "ethers";
import { getWeb3ExecuteFunctionOption } from "src/contractAbi";
import moralisConfig from "src/moralisConfig";
import { IMintAlertHandler } from "./mintAlertHandler";

const fetchMintBetamon = ({
    mintMethodName,
    setAlertData,
    disableAlert,
    amount,
    mintPrice,
    fetch,
    lang
}: Pick<
    IMintAlertHandler,
    'amount'|'mintPrice'|'mintMethodName'|'setAlertData'|'lang'|'disableAlert'|'fetch'
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
            setAlertData({
                enable: true,
                content: lang.MINTED_ALERT,
                btnList: [
                    {
                        text: lang.MINTED_ALERT_BTN,
                        onClick: () => {
                            disableAlert();
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