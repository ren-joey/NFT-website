import { EventBus } from "src/bus";
import hrefTo from "src/functions/hrefTo";
import { Lang } from "src/lang";
import { socialList } from "src/configs/socialMediaConfig";

const enableSoldOutAlert = ({
    lang
}: {
    lang: Lang
}) => {
    EventBus.$emit(
        'global-alert',
        {
            content: lang.MINT_SOLD_OUT,
            btnList: [
                {
                    text: lang.GO_TO_OPENSEA,
                    onClick: () => hrefTo(socialList[0])
                },
                {
                    text: lang.GO_TO_DISCORD,
                    onClick: () => hrefTo(socialList[1])
                }
            ]
        }
    );
};

export default enableSoldOutAlert;