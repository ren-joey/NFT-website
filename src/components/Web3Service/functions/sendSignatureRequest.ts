import Web3 from 'web3';
import { getUuid } from 'src/utils';

interface Props {
    account: string;
    message: string;
    password?: string;
}

const sendSignatureRequest = ({
    account,
    message,
    password = getUuid()
}: Props) => {
    const { ethereum } = window;
    const web3 = new Web3(ethereum);

    return web3.eth.personal.sign(message, account, password);
};

export default sendSignatureRequest;