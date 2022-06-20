import axios from "axios";
import { CSSProperties, useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import SharedButton from "src/components/Shared/Buttons/SharedButton";
import CheckSign from "src/components/Shared/CheckSign";
import LoadingCircle from "src/components/Shared/LoadingCircle";
import transactionReceiptCheck from "src/components/Web3Service/functions/transactionReceiptCheck";
import ethConfig from "src/configs/ethConfig";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import sleepHelper from "src/utils/basic/sleepHelper";
import stringReplacer from "src/utils/stringFormat/stringReplacer";
import AlertStar from "../AlertStar";
import { FormEssentials } from "../FormAlert";
import WarningIcon from "../WarningIcon";
import { completeExchange, send, sign, transferNftToContractOwner } from "../functions/formSubmitUtils";

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
    const [memo, setMemo] = useState('');
    const message = useMemo(() => {
        if (aNft) {
            const msgPattern = '是否同意兌換實體公仔？後續將空投 #${} RNFT至VBC錢包；過程將支付gas fee，申請完成後VBC將再空投NFT給您。Do you agree to redeem ? The #${} RNFT will return to VBC wallet. It need to pay the gas fee. VBC will send the redeemed NFT to your wallet.';
            return stringReplacer(msgPattern, aNft.token_id, aNft.token_id);
        }
        return '';
    }, [aNft]);
    const iconSize: CSSProperties = { width: '0.8rem', height: '0.8rem' };
    const {
        alertClassName,
        memoIcon,
        title
    }  = useMemo(() => {
        let className = 'alert-body';
        let icon = <LoadingCircle size={iconSize} />;
        let title = '正在提交您的召喚資料';

        if (status === -1) {
            className += ' fail';
            icon = <WarningIcon />;
            title = '申請失敗';
        } else if (status === 1) {
            className += ' success';
            icon = <CheckSign style={iconSize} />;
            title = '申請成功';
        } else if (status === 0) {
            className += ' sending';
        }

        return {
            alertClassName: className,
            memoIcon: icon,
            title
        };
    }, [status]);

    const failHandler = () => {
        setMemo('兌換申請失敗，請重新申請');
        setStatus(-1);
        setTimeout(cancel, 3000);
    };

    const successHandler = () => {
        setMemo('此 NFT 已經完成申請。');
        setStatus(1);
    };

    const doSubmit = async () => {
        if (!account
            || account.toLowerCase() === ethConfig.ownerAddress.toLowerCase()
        ) {
            setMemo('您的帳戶有誤，請稍後再試');
            setStatus(-1);
            setTimeout(cancel, 3000);
            return;
        }

        setMemo('簽署中');
        const signature =  await sign({ account, message });
        if (!signature) {
            failHandler();
            return;
        }

        setMemo('資料驗證中');
        const resForm = await send({ account, aNft, form, message, signature });
        if (!resForm || resForm.message) {
            if (resForm && resForm.message) alert(resForm.message);
            failHandler();
            return;
        } else if (resForm && resForm.is_transferred) {
            successHandler();
            return;
        }

        setMemo('NFT 轉移中');
        const transaction = await transferNftToContractOwner({ account, aNft, fetch });
        if (!transaction) {
            failHandler();
            return;
        }

        setMemo('等待交易中，可能需要數分鐘的時間，請耐心等候，勿關閉視窗');
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

        const finalSubmission: any = await completeExchange({ aNft, form });
        if (finalSubmission.is_transferred === true) {
            successHandler();
        } else {
            failHandler();
        }
    };

    useEffect(() => {
        doSubmit();
    }, []);

    return (
        <div className={alertClassName}>
            <div className="form-title">{title}</div>

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

                <div className="text-center message">
                    { memoIcon }&nbsp;{ memo }
                </div>

            </div> {/* form-content */}

            {
                status === 1 && (
                    <div className="button-area">
                        <SharedButton
                            type="gray"
                            text="關閉"
                            onClick={() => {
                                cancel(true);
                                EventBus.$emit('get-nft-balance');
                            }}
                        />
                    </div>
                )
            }

            <div className="form-bottom"></div>
        </div>
    );
};

export default SubmitProcedure;