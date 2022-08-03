import { IMintAlertHandler } from 'src/components/Web3Service/mintHandlers/mintAlertHandler';
import enableGlobalAlert from 'src/functions/enableGlobalAlert';
import stringReplacer from 'src/utils/stringFormat/stringReplacer';

const enableExceedAlert = ({
    maxBalance,
    lang
}: Pick<
    IMintAlertHandler,
    'maxBalance'|'lang'
    >
) => {
    if (maxBalance === null) return;
    enableGlobalAlert({
        content: stringReplacer(lang.MINT_EXCESS_ALERT, maxBalance),
        btnList: [
            { text: lang.I_WILL_ADJUST }
        ]
    });
};

export default enableExceedAlert;