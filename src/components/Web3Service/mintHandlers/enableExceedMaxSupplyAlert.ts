import enableGlobalAlert from 'src/functions/enableGlobalAlert';
import { Lang } from 'src/lang';

const enableExceedMaxSupplyAlert = ({
    lang
}: {
    lang: Lang
}) => {
    enableGlobalAlert({
        content: lang.MINT_EXCESS_TOTAL_SUPPLY,
        btnList: [
            { text: lang.I_WILL_ADJUST }
        ]
    });
};

export default enableExceedMaxSupplyAlert;