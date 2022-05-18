import { StableNft } from "src/@types/nft";
import { EventBus } from "src/bus";
import SharedButton from "src/components/Shared/Buttons/SharedButton";
import AlertStar from "./AlertStar";
import { FormData, FormEssentials, FormWarning } from "./FormAlert";
import WarningIcon from "./WarningIcon";

const FormEditor = ({
    form,
    setForm,
    aNft,
    warning,
    cancel,
    submit
}: FormEssentials) => (
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
                    <div className="form-input-area">
                        <div className="form-input-label">姓名</div>
                        <input
                            className="form-input sm"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((f) => (
                                {...f, name: e.target.value}
                            ))}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-input-area">
                        <div className="form-input-label">電話</div>
                        <input
                            className="form-input sm"
                            type="text"
                            value={form.phone}
                            onChange={(e) => setForm((f) => (
                                {...f, phone: e.target.value}
                            ))}
                        />
                    </div>
                </div>
            </div>

            <div className="form-input-area">
                <div className="form-input-label">郵件</div>
                <input
                    className="form-input sm"
                    type="text"
                    value={form.email}
                    onChange={(e) => setForm((f) => (
                        {...f, email: e.target.value}
                    ))}
                />
            </div>

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
                    <div className="form-input-area">
                        <div className="form-input-label">國家</div>
                        <input
                            className="form-input sm"
                            type="text"
                            value={form.country}
                            onChange={(e) => setForm((f) => (
                                {...f, country: e.target.value}
                            ))}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-input-area">
                        <div className="form-input-label">城市</div>
                        <input
                            className="form-input sm"
                            type="text"
                            value={form.city}
                            onChange={(e) => setForm((f) => (
                                {...f, city: e.target.value}
                            ))}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-input-area">
                        <div className="form-input-label">區碼</div>
                        <input
                            className="form-input sm"
                            type="text"
                            value={form.zip}
                            onChange={(e) => setForm((f) => (
                                {...f, zip: e.target.value}
                            ))}
                        />
                    </div>
                </div>
            </div>

            <div className="form-input-area">
                <div className="form-input-label">地址</div>
                <input
                    className="form-input sm"
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm((f) => (
                        {...f, address: e.target.value}
                    ))}
                />
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

                                <div
                                    className="nft-term mt-2rem"
                                    onClick={() => setForm((form) => ({
                                        ...form,
                                        term_1: !form.term_1
                                    }))}>
                                    <div className={`nft-term-check-box ${form.term_1 ? 'checked': ''}`}></div>
                                    <div className="nft-term-text">
                                        確定實體化將不可撤回取消
                                    </div>
                                </div>

                                <div
                                    className="nft-term"
                                    onClick={() => setForm((form) => ({
                                        ...form,
                                        term_2: !form.term_2
                                    }))}>
                                    <div className={`nft-term-check-box ${form.term_2 ? 'checked': ''}`}></div>
                                    <div className="nft-term-text">
                                        本人已詳閱相關說明<span className="clickable-span" onClick={(v) => {
                                            v.stopPropagation();
                                            EventBus.$emit('faq');
                                        }}>【FAQ】</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

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

export default FormEditor;