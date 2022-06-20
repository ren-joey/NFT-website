import { useContext } from "react";
import { StableNft } from "src/@types/nft";
import BasicAlert from "./Alerts/BasicAlert";
import FaqAlert from "./Alerts/FaqAlert";
import FormAlert from "./Alerts/FormAlert";

interface Props {
    selectedNfts: StableNft[]
}

const ExchangeAlertController = ({ selectedNfts }: Props) => (
    <div>
        <FormAlert selectedNfts={selectedNfts} />

        <FaqAlert />

        <BasicAlert />
    </div>
);

export default ExchangeAlertController;