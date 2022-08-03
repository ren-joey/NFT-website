import { StableNft } from 'src/@types/nft';
import FaqAlert from './Alerts/FaqAlert';
import FormAlert from './Alerts/FormAlert';

interface Props {
    selectedNfts: StableNft[]
}

const ExchangeAlertController = ({ selectedNfts }: Props) => (
    <div>
        <FormAlert selectedNfts={selectedNfts} />
        <FaqAlert />
    </div>
);

export default ExchangeAlertController;