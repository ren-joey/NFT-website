import { NullableString } from 'src/@types/basicVariable';
import { MoralisFetch } from 'src/@types/contract';
import { StableNft } from 'src/@types/nft';
import transactionReceiptCheck from 'src/components/Web3Service/functions/transactionReceiptCheck';
import ethConfig from 'src/configs/ethConfig';
import { Lang } from 'src/lang';
import sleepHelper from 'src/utils/basic/sleepHelper';
import stringReplacer from 'src/utils/stringFormat/stringReplacer';
import { FormData } from '../../FormAlert';
import { completeExchange, send, sign, transferNft } from './formSubmitUtils';

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
        /**
         * 若帳戶不存在，代表用戶可能沒有登入錢包
         * 或
         * 若帳戶與 SmartContract 擁有者相同
         * -> 無法申請兌換
         */
        if (!account
        || account.toLowerCase() === ethConfig.ownerAddress.toLowerCase()
        ) throw new Error(lang.ACCOUNT_ERROR_MESSAGE);

        const msgPattern = lang.SIGNATURE_MESSAGE;
        const message = stringReplacer(msgPattern, aNft.token_id, aNft.token_id);

        /**
         * 簽署訊息
         * 該動作可協助 server side 驗證 API sender 與 nft owner 為同一人
         */
        setMemo(lang.SUBMISSION_SIGNING);
        const signature =  await sign({ account, message });
        if (!signature) throw new Error();

        /**
         * 驗證簽署訊息並提交申請
         * 若返回的資料 is_transferred 有值，代表該 nft 已經被申請過
         */
        setMemo(lang.SUBMISSION_VERIFYING);
        const resForm = await send({ account, aNft, form, message, signature });
        if (!resForm || resForm.message || !resForm.id) {
            throw new Error(
                typeof resForm?.message === 'string'
                    ? resForm.message
                    : ''
            );
        } else if (resForm && resForm.is_transferred) {
            successHandler();
            return;
        }

        /**
         * 等待用戶轉移 NFT 給合約擁有人
         */
        setMemo(lang.SUBMISSION_NFT_TRANSFERRING);
        const transaction = await transferNft({
            from: account,
            to: ethConfig.nftExchangeOfficialAddress,
            aNft,
            fetch
        });
        if (!transaction) throw new Error(lang.NFT_TRANSFER_ERROR_MESSAGE);

        /**
         * 每秒鐘確認一次，等待轉移 nft 的 transaction 被以太坊處理完成
         * 如果返回的 status 為 false 代表處理失敗，有可能：
         *      1. 用戶自己取消
         *      2. transaction execution fail
         *      3. out of gas
         */
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

        /**
         * transaction 完成後通知 server 驗證擁有者
         * 基本上會驗證成功 (因為前端在前面一步驟已經驗證完了)
         * 並且將該筆資料的 is_transferred 更新為 true
         */
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