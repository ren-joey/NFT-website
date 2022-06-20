import { useContext } from "react";
import { EventBus } from "src/bus";
import SharedButton from "src/components/Shared/Buttons/SharedButton";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import AlertStar from "../AlertStar";
import TermsReadOnly from "./TermsReadOnly";
import { FormEssentials } from "../FormAlert";
import WarningIcon from "../WarningIcon";

const FormReadOnly = ({
    form,
    aNft,
    cancel,
    submit
}: FormEssentials) => {
    const { device } = useContext(EventContext);
    const lang = useContext(LangContext);

    return (
        <div className="alert-body">
            <div className="form-title">
                召喚資料填寫<br />
                <small>
                    請填寫您地球上資料，β星人將儘快與您相見
                </small>
            </div>

            <div className="form-content">
                <div className="form-section-title">
                    <AlertStar /> 基本資料
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">姓名：{form.name}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">電話：{form.phone}</div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">郵件：{form.email}</div>
                </div>

                <div className="form-section-title">
                    <AlertStar /> 寄送地址
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">國家：{form.country}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">城市：{form.city}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">區碼：{form.zip}</div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">地址：{form.address}</div>
                </div>

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
                    <WarningIcon /> 送出後將無法修改，請務必確認您的寄送資料
                </div>

            </div> {/* form-content */}

            <div className="button-area">
                <SharedButton
                    type="gray"
                    text="返回修改"
                    onClick={cancel}
                />
                <SharedButton
                    text="確認送出"
                    onClick={submit}
                />
            </div>

            <div className="form-bottom"></div>
        </div>
    );
};

export default FormReadOnly;