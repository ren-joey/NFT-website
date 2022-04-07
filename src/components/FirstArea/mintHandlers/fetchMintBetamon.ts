import { BigNumber } from "ethers";
import { EventBus } from "src/bus";
import { getWeb3ExecuteFunctionOption } from "src/views/contractAbi";
import { nullableBigNumber } from "src/views/interfaces";
import moralisConfig from "src/views/moralisConfig";
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
    const doFetch = async (price: nullableBigNumber) => {
        const mintBetamonOptions = getWeb3ExecuteFunctionOption(mintMethodName);

        const result: any = await fetch({
            params: {
                ...mintBetamonOptions,
                msgValue: price === null || price.isZero() ? 0 : price.mul(amount).toString(),
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

    if (!mintPrice) {
        EventBus.$emit(`fetchMintPrice`).then((price: BigNumber) => {
            doFetch(price);
        });
    } else {
        doFetch(mintPrice.mul(amount));
    }
});

export default fetchMintBetamon;