import axios from "axios";
import { stat } from "fs";
import { result } from "lodash";
import { send } from "process";
import { useContext, useEffect, useRef, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { StableNft } from "src/@types/nft";
import { EventBus } from "src/bus";
import LoadingCircle from "src/components/Shared/LoadingCircle";
import SharedAlert from "src/components/Shared/SharedAlert";
import fetchContractVariable from "src/components/Web3Service/functions/fetchContractVariable";
import sendSignatureRequest from "src/components/Web3Service/functions/sendSignatureRequest";
import transactionReceiptCheck from "src/components/Web3Service/functions/transactionReceiptCheck";
import moralisConfig from "src/configs/moralisConfig";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import sleepHelper from "src/utils/basic/sleepHelper";
import stringReplacer from "src/utils/stringFormat/stringReplacer";
import AlertStar from "./AlertStar";
import TermsReadOnly from "./Form/TermsReadOnly";
import { FormData, FormEssentials } from "./FormAlert";
import WarningIcon from "./WarningIcon";

const SubmitProcedure = ({
    form,
    cancel,
    aNft
}: FormEssentials) => {
    const lang = useContext(LangContext);
    const { device } = useContext(EventContext);
    const { account } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState('');
    const msgPattern = '是否同意兌換實體公仔？後續將空投 #${} RNFT至VBC錢包；過程將支付gas fee，申請完成後VBC將再空投NFT給您。Do you agree to redeem ? The #${} RNFT will return to VBC wallet. It need to pay the gas fee. VBC will send the redeemed NFT to your wallet.';
    const signatureMsg = stringReplacer(msgPattern, aNft.token_id, aNft.token_id);

    const sign = () => new Promise<null|string>((resolve) => {
        if (!account) resolve(null);
        else {
            sendSignatureRequest({
                account,
                message: signatureMsg
            })
                .then((signature) => resolve(signature))
                .catch(() => resolve(null));
        }
    });

    const send = (signature: string) => new Promise<any>((resolve) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/submit',
            data: {
                ...form,
                full_name: form.name,
                nft_id: aNft.token_id,
                owner: account,
                message: signatureMsg,
                signature
            }
        })
            .then((res) => resolve(res.data))
            .catch((err) => resolve(err.response.data));
    });

    const transferNftToContractOwner = () => new Promise<any>((resolve) => {
        fetchContractVariable({
            fetch,
            paramName: 'transferFrom',
            params: {
                from: account,
                to: moralisConfig.ownerAddress,
                tokenId: aNft.token_id
            }
        })
            .then((res) => resolve(res))
            .catch((err) => resolve(err));
    });

    const completeExchange = () => new Promise((resolve) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/transfer-verify',
            data: {
                ...form,
                nft_id: aNft.token_id
            }
        })
            .then((res) => resolve(res.data))
            .catch((err) => resolve(err.response.data));
    });

    const failHandler = () => {
        setMessage('兌換申請失敗，請重新申請');
        setStatus(-1);
        setTimeout(cancel, 3000);
    };

    const doSubmit = async () => {
        setMessage('簽署中');
        const signature =  await sign();
        if (!signature) {
            failHandler();
            return;
        }

        setMessage('資料驗證中');
        const form = await send(signature);
        if (!form || form.message) {
            if (form && form.message) alert(form.message);
            failHandler();
            return;
        } else if (form && form.is_transferred) {
            setMessage('此 NFT 已經完成申請。');
            return;
        }

        setMessage('NFT 轉移中');
        const transaction = await transferNftToContractOwner();
        if (!transaction) {
            failHandler();
            return;
        }

        setMessage('等待交易中，可能需要數分鐘的時間，請耐心等候，勿關閉視窗');
        let receipt;
        while (!receipt
            || (receipt.status !== true
                && receipt.status !== false)
        ) {
            receipt = await transactionReceiptCheck(transaction.hash);
            await sleepHelper(1000);
        }
        if (receipt.status === false) {
            failHandler();
            return;
        }

        const finalSubmission = await completeExchange();
        console.log(finalSubmission);
        // TODO:
    };

    useEffect(() => {
        doSubmit();
    }, []);

    return (
        <div className="alert-body">
            <div className="form-title">
                正在提交您的召喚資料
            </div>

            <div className="form-content">

                <div className="form-section-title">
                    <AlertStar /> 召喚項目
                </div>

                <div className="form-nft-section">
                    {
                        aNft && (
                            <div className="form-nft" key={aNft.token_id}>
                                <div className="nft-img">
                                    <img
                                        width="100%"
                                        height="auto"
                                        src={aNft.metadata.image}
                                        alt={aNft.metadata.name}
                                    />
                                </div>

                                <div className="nft-desc">
                                    <div className="f-bold">卡片名稱</div>

                                    <div className="nft-name">
                                        {aNft.metadata.name}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <br />

                <div className="text-center">
                    {
                        status > -1
                            ? <LoadingCircle size={{ width: '0.8rem', height: '0.8rem' }} />
                            : <WarningIcon />
                    }
                    &nbsp;{ message }
                </div>

            </div> {/* form-content */}

            <div className="form-bottom"></div>
        </div>
    );
};

export default SubmitProcedure;