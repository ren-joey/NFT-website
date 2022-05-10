import { NftAlertEssentials } from "src/@types/viewVariables";
import SharedAlert from 'src/components/Shared/SharedAlert';

const ExchangeAlertController = ({
    enable,
    type,
    alertData = undefined,
    stableNfts = undefined,
    disableAlert,
    setAlert
}: NftAlertEssentials) => {
    if (enable === false) {
        return (null);
    } else if (type === 'basic' && alertData !== undefined) {
        return (
            <SharedAlert
                enable={enable}
                content={alertData.content}
                btnList={alertData.btnList}
            />
        );
    } else if (type === 'faq') {
        return (
            <SharedAlert
                enable={true}
                content={
                    <div>faq</div>
                }
                btnList={[]}
            />
        );
    } else if (type === 'form' && stableNfts !== undefined) {
        return (
            <SharedAlert
                enable={true}
                content={
                    <div>shared alert</div>
                }
                btnList={[]}
            />
        );
    }
    return (null);
};

export default ExchangeAlertController;