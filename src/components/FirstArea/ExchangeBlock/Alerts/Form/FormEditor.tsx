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
                {lang.FILL_SUMMON_FORM_TITLE}<br />
                <small>
                    {lang.FILL_SUMMON_FORM_SUBTITLE}
                </small>
            </div>

            <div className="form-content">
                <div className="form-section-title">
                    <AlertStar /> {lang.BASIC_INFORMATION}
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
                            label={lang.FULL_NAME}
                            value={form.name}
                            onChange={(e) => setForm((f) => (
                                {...f, name: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={lang.PHONE}
                            value={form.phone}
                            onChange={(e) => setForm((f) => (
                                {...f, phone: e.target.value}
                            ))}
                        />
                    </div>
                </div>

                <SharedInput
                    label={lang.EMAIL}
                    value={form.email}
                    onChange={(e) => setForm((f) => (
                        {...f, email: e.target.value}
                    ))}
                />

                <div className="form-section-title">
                    <AlertStar /> {lang.DELIVERY_ADDRESS}
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
                            label={lang.COUNTRY}
                            value={form.country}
                            onChange={(e) => setForm((f) => (
                                {...f, country: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={lang.CITY}
                            value={form.city}
                            onChange={(e) => setForm((f) => (
                                {...f, city: e.target.value}
                            ))}
                        />
                    </div>
                    <div className="form-column">
                        <SharedInput
                            label={lang.ZIP}
                            value={form.zip}
                            onChange={(e) => setForm((f) => (
                                {...f, zip: e.target.value}
                            ))}
                        />
                    </div>
                </div>

                <SharedInput
                    label={lang.REAL_ADDRESS}
                    value={form.address}
                    onChange={(e) => setForm((f) => (
                        {...f, address: e.target.value}
                    ))}
                />

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
                    text={lang.CANCEL}
                    onClick={cancel}
                />
                <SharedButton
                    text={lang.HAVE_FILLED_OUT}
                    onClick={submit}
                />
            </div>

            <div className="form-bottom"></div>
        </div>
    );
};

export default FormEditor;