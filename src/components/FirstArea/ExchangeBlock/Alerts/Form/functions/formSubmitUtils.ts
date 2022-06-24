import axios from "axios";
import { MoralisFetch } from "src/@types/contract";
import { StableNft } from "src/@types/nft";
import fetchContractVariable from "src/components/Web3Service/functions/fetchContractVariable";
import sendSignatureRequest from "src/components/Web3Service/functions/sendSignatureRequest";
import ethConfig from "src/configs/ethConfig";
import { FormData } from "../../FormAlert";

interface SignParams {
    account: string;
    message: string;
}

const sign = ({
    account,
    message
}: SignParams) => new Promise<null|string>((resolve) => {
    sendSignatureRequest({
        account,
        message
    })
        .then((signature) => resolve(signature))
        .catch(() => resolve(null));
});

interface SendParams {
    form: FormData;
    aNft: StableNft;
    message: string;
    signature: string;
    account: string;
}

const send = ({
    aNft,
    account,
    form,
    message,
    signature
}: SendParams) => new Promise<any>((resolve) => {
    axios({
        method: 'POST',
        url: '/api/submit',
        data: {
            ...form,
            full_name: form.name,
            nft_id: aNft.token_id,
            owner: account,
            message,
            signature
        }
    })
        .then((res) => resolve(res.data))
        .catch((err) => resolve(err.response.data));
});

interface NftTransferParams {
    fetch: MoralisFetch;
    account: string;
    aNft: StableNft;
}

const transferNftToContractOwner = ({
    fetch,
    account,
    aNft
}: NftTransferParams) => new Promise<any>((resolve) => {
    fetchContractVariable({
        fetch,
        paramName: 'transferFrom',
        params: {
            from: account,
            to: ethConfig.ownerAddress,
            tokenId: aNft.token_id
        }
    })
        .then((res) => resolve(res))
        .catch((err) => resolve(err));
});

interface CompleteExchangeParams {
    form: FormData;
    aNft: StableNft;
}

const completeExchange = ({
    aNft,
    form
}: CompleteExchangeParams) => new Promise((resolve) => {
    axios({
        method: 'POST',
        url: '/api/transfer-verify',
        data: {
            ...form,
            nft_id: aNft.token_id
        }
    })
        .then((res) => resolve(res.data))
        .catch((err) => resolve(err.response.data));
});

export {
    sign,
    send,
    transferNftToContractOwner,
    completeExchange
};