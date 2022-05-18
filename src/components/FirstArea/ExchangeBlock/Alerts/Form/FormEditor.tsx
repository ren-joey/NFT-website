import { useContext, useMemo } from "react";
import { EventBus } from "src/bus";
import SharedButton from "src/components/Shared/Buttons/SharedButton";
import { EventContext } from "src/Context/EventContext";
import { LangContext } from "src/Context/LangContext";
import AlertStar from "../AlertStar";
import { FormEssentials } from "../FormAlert";
import WarningIcon from "../WarningIcon";
import SharedInput from "./SharedInput";
import Terms from "./Terms";

const FormEditor = (formEssentials: FormEssentials) => {
    const {
        form,
        setForm,
        aNft,
        warning,
        cancel,
        submit
    } = formEssentials;
    const lang = useContext(LangContext);
    const { device } = useContext(EventContext);

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
                    {
                        warning.term_1 && (
                            <div className="form-section-warning">
                                <WarningIcon /> {warning.term_1}
                            </div>
                        )
                    }
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <SharedInput
                            label={'姓名'}
                            value={form.name}
                            onChange={(e) => setForm((f) => (
                                {...f, name: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={'電話'}
                            value={form.phone}
                            onChange={(e) => setForm((f) => (
                                {...f, phone: e.target.value}
                            ))}
                        />
                    </div>
                </div>

                <SharedInput
                    label={'郵件'}
                    value={form.email}
                    onChange={(e) => setForm((f) => (
                        {...f, email: e.target.value}
                    ))}
                />

                <div className="form-section-title">
                    <AlertStar /> 寄送地址
                    {
                        warning.term_2 && (
                            <div className="form-section-warning">
                                <WarningIcon /> {warning.term_2}
                            </div>
                        )
                    }
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <SharedInput
                            label={'國家'}
                            value={form.country}
                            onChange={(e) => setForm((f) => (
                                {...f, country: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={'城市'}
                            value={form.city}
                            onChange={(e) => setForm((f) => (
                                {...f, city: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={'區碼'}
                            value={form.zip}
                            onChange={(e) => setForm((f) => (
                                {...f, zip: e.target.value}
                            ))}
                        />
                    </div>
                </div>

                <SharedInput
                    label={'地址'}
                    value={form.address}
                    onChange={(e) => setForm((f) => (
                        {...f, address: e.target.value}
                    ))}
                />

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

                                    {
                                        device === 'desktop' && (
                                            <Terms {...formEssentials} />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    device === 'phone' && (
                        <Terms {...formEssentials} />
                    )
                }
            </div> {/* form-content */}

            <div className="button-area">
                <SharedButton
                    type="gray"
                    text="取消"
                    onClick={cancel}
                />
                <SharedButton
                    text="填寫完畢"
                    onClick={submit}
                />
            </div>

            <div className="form-bottom"></div>
        </div>
    );
};

export default FormEditor;