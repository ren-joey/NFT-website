import { NullableString } from "src/@types/basicVariable";
import { MoralisFetch } from "src/@types/contract";
import { StableNft } from "src/@types/nft";
import transactionReceiptCheck from "src/components/Web3Service/functions/transactionReceiptCheck";
import ethConfig from "src/configs/ethConfig";
import { Lang } from "src/lang";
import sleepHelper from "src/utils/basic/sleepHelper";
import stringReplacer from "src/utils/stringFormat/stringReplacer";
import { FormData } from "../../FormAlert";
import { completeExchange, send, sign, transferNftToContractOwner } from "./formSubmitUtils";

interface ProcedureEssentials {
    account: NullableString;
    aNft: StableNft;
    lang: Lang;
    setMemo: (key: string) => void;
    setStatus: (key: number) => void;
    cancel: (key?: boolean) => any;
    fetch: MoralisFetch,
    form: FormData
}

const submissionProcedure = async ({
    account,
    lang,
    aNft,
    setMemo,
    setStatus,
    cancel,
    fetch,
    form
}: ProcedureEssentials) => {
    const failHandler = (error: string) => {
        setMemo(error ? error : lang.SUBMISSION_FAILED_ERROR_MESSAGE);
        setStatus(-1);
        setTimeout(cancel, 3000);
    };
    const successHandler = () => {
        setMemo(lang.SUBMISSION_SUCCEEDED_MESSAGE);
        setStatus(1);
    };

    try {
        if (!account
        || account.toLowerCase() === ethConfig.ownerAddress.toLowerCase()
        ) throw new Error(lang.ACCOUNT_ERROR_MESSAGE);

        const msgPattern = lang.SIGNATURE_MESSAGE;
        const message = stringReplacer(msgPattern, aNft.token_id, aNft.token_id);

        setMemo(lang.SUBMISSION_SIGNING);
        const signature =  await sign({ account, message });
        if (!signature) throw new Error();

        setMemo(lang.SUBMISSION_VERIFYING);
        const resForm = await send({ account, aNft, form, message, signature });
        if (!resForm || resForm.message) {
            throw new Error(resForm?.message);
        } else if (resForm && resForm.is_transferred) {
            successHandler();
            return;
        }

        setMemo(lang.SUBMISSION_NFT_TRANSFERRING);
        const transaction = await transferNftToContractOwner({ account, aNft, fetch });
        if (!transaction) throw new Error(lang.NFT_TRANSFER_ERROR_MESSAGE);

        setMemo(lang.SUBMISSION_TRANSACTION_WAITING);
        let receipt;
        while (!receipt
            || (receipt.status !== true
                && receipt.status !== false)
        ) {
            receipt = await transactionReceiptCheck(transaction.hash);
            await sleepHelper(1000);
        }
        if (receipt.status === false) throw new Error(lang.TRANSACTION_ERROR_MESSAGE);

        const finalSubmission: any = await completeExchange({ aNft, form });
        if (finalSubmission.is_transferred === true) {
            successHandler();
        } else throw new Error();
    } catch (error) {
        if (error instanceof Error) {
            failHandler(error.message);
        }
    }
};

export default submissionProcedure;