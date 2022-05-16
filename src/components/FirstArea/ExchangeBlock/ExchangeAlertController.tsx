import { useContext } from "react";
import { StableNft } from "src/@types/nft";
import SharedAlert from 'src/components/Shared/SharedAlert';
import { LangContext } from "src/Context/LangContext";

interface Props {
    selectedNfts: StableNft[]
}

const ExchangeAlertController = ({ selectedNfts }: Props) => {
    const lang = useContext(LangContext);

    return (
        <div>
            <SharedAlert
                id="basic"
                content={<div>basic</div>}
                btnList={[
                    { text: 'test' }
                ]}
            />

            <SharedAlert
                id="faq"
                content={<div>faq</div>}
                btnList={[
                    { text: 'test' }
                ]}
            />

            <SharedAlert
                id="form"
                content={<div>shared alert</div>}
                btnList={[
                    { text: 'test' }
                ]}
            />
        </div>
    );
};

export default ExchangeAlertController;