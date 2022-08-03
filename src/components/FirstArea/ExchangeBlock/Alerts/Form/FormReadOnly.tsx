import { useContext } from 'react';
import SharedButton from 'src/components/Shared/Buttons/SharedButton';
import { LangContext } from 'src/Context/LangContext';
import AlertStar from '../AlertStar';
import { FormEssentials } from '../FormAlert';
import WarningIcon from '../WarningIcon';

const FormReadOnly = ({
    form,
    aNft,
    cancel,
    submit
}: FormEssentials) => {
    const lang = useContext(LangContext);

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
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">{lang.FULL_NAME}：{form.name}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">{lang.PHONE}：{form.phone}</div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">{lang.EMAIL}：{form.email}</div>
                </div>

                <div className="form-section-title">
                    <AlertStar /> {lang.DELIVERY_ADDRESS}
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">{lang.COUNTRY}：{form.country}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">{lang.CITY}：{form.city}</div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">{lang.ZIP}：{form.zip}</div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">{lang.REAL_ADDRESS}：{form.address}</div>
                </div>

                <div className="form-section-title">
                    <AlertStar /> {lang.SUMMON_ITEM}
                </div>

                <div className="form-nft-section">
                    {
                        aNft && (
                            <div
                                className="form-nft"
                                key={aNft.token_id}
                            >
                                <div className="nft-img">
                                    <img
                                        width="100%"
                                        height="auto"
                                        src={aNft.metadata.image}
                                        alt={aNft.metadata.name}
                                    />
                                </div>

                                <div className="nft-desc">
                                    <div className="f-bold">{lang.CARD_NAME}</div>

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
                    <WarningIcon /> {lang.PLEASE_CONFIRM_YOUR_INFORMATION}
                </div>

            </div> {/* form-content */}

            <div className="button-area">
                <SharedButton
                    type="gray"
                    text={lang.BACK_TO_EDIT}
                    onClick={cancel}
                />
                <SharedButton
                    text={lang.CONFIRM_AND_SUBMIT}
                    onClick={submit}
                />
            </div>

            <div className="form-bottom"></div>
        </div>
    );
};

export default FormReadOnly;