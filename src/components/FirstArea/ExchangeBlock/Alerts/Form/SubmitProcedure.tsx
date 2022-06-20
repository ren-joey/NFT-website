import { CSSProperties, useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { EventBus } from "src/bus";
import SharedButton from "src/components/Shared/Buttons/SharedButton";
import CheckSign from "src/components/Shared/CheckSign";
import LoadingCircle from "src/components/Shared/LoadingCircle";
import { LangContext } from "src/Context/LangContext";
import AlertStar from "../AlertStar";
import { FormEssentials } from "../FormAlert";
import WarningIcon from "../WarningIcon";
import submissionProcedure from "./functions/submissionProcedure";

const SubmitProcedure = ({
    form,
    cancel,
    aNft
}: FormEssentials) => {
    const lang = useContext(LangContext);
    const { account } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const [status, setStatus] = useState(0);
    const [memo, setMemo] = useState('');
    const iconSize: CSSProperties = { width: '0.8rem', height: '0.8rem' };
    const {
        alertClassName,
        memoIcon,
        title
    }  = useMemo(() => {
        let className = 'alert-body';
        let icon = <LoadingCircle size={iconSize} />;
        let title = lang.SUBMITTING;

        if (status === -1) {
            className += ' fail';
            icon = <WarningIcon />;
            title = lang.SUBMISSION_FAILED;
        } else if (status === 1) {
            className += ' success';
            icon = <CheckSign style={iconSize} />;
            title = lang.SUBMISSION_SUCCEEDED;
        } else if (status === 0) {
            className += ' sending';
        }

        return {
            alertClassName: className,
            memoIcon: icon,
            title
        };
    }, [status]);

    useEffect(() => {
        submissionProcedure({
            account,
            aNft,
            cancel,
            fetch,
            form,
            lang,
            setMemo,
            setStatus
        });
    }, []);

    return (
        <div className={alertClassName}>
            <div className="form-title">{title}</div>

            <div className="form-content">

                <div className="form-section-title">
                    <AlertStar /> {lang.SUMMON_ITEM}
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
                                    <div className="f-bold">
                                        {lang.CARD_NAME}
                                    </div>

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
                            text={lang.CLOSE}
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