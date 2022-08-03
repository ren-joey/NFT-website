import enableGlobalAlert from 'src/functions/enableGlobalAlert';
import stringReplacer from 'src/utils/stringFormat/stringReplacer';
import fetchMintBetamon from './fetchMintBetamon';
import { IMintAlertHandler } from './mintAlertHandler';

const enableConfirmAlert = ({
    amount,
    maxBalance,
    lang,
    fetch,
    mintMethodName,
    mintPrice
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'lang'|'amount'|'fetch'|'mintMethodName'|'mintPrice'
    >
) => {
    if (amount === null
        || maxBalance === null
        || mintPrice === null) return;
    enableGlobalAlert({
        content: stringReplacer(lang.MINT_ALERT, amount, maxBalance),
        btnList: [
            {
                text: lang.CANCEL,
                type: 'gray'
            },
            {
                text: lang.CONFIRM,
                onClick: () => {
                    fetchMintBetamon({
                        amount,
                        fetch,
                        lang,
                        mintMethodName,
                        mintPrice
                    });
                }
            }
        ]
    });
};

export default enableConfirmAlert;