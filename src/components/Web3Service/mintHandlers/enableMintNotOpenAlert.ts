import enableGlobalAlert from 'src/functions/enableGlobalAlert';
import { Lang } from 'src/lang';

const enableMintNotOpenAlert = ({
    lang
}: {
    lang: Lang
}) => {
    enableGlobalAlert({
        content: lang.MINT_NOT_OPEN,
        btnList: [
            { text: lang.I_WILL_EXPECT }
        ]
    });
};

export default enableMintNotOpenAlert;