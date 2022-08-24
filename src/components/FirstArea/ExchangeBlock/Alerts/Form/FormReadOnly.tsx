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
        <div className="alert-body read-only">
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
                            <div className="form-input-label">
                                {lang.FULL_NAME}：
                                <span className="form-hgl">
                                    {form.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">
                                {lang.PHONE}：
                                <span className="form-hgl">
                                    {form.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">
                        {lang.EMAIL}：
                        <span className="form-hgl">
                            {form.email}
                        </span>
                    </div>
                </div>

                <div className="form-section-title">
                    <AlertStar /> {lang.DELIVERY_ADDRESS}
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">
                                {lang.COUNTRY}：
                                <span className="form-hgl">
                                    {form.country}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">
                                {lang.CITY}：
                                <span className="form-hgl">
                                    {form.city}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-input-area">
                            <div className="form-input-label">
                                {lang.ZIP}：
                                <span className="form-hgl">
                                    {form.zip}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-input-area">
                    <div className="form-input-label">
                        {lang.REAL_ADDRESS}：
                        <span className="form-hgl">
                            {form.address}
                        </span>
                    </div>
                </div>

                <div className="form-section-title">
                    <AlertStar /> {lang.SUBMISSION_SHIPPING_RULE}
                </div>

                <div className="form-input-area">
                    {lang.SUBMISSION_SHIPPING_TIME}
                </div>

                <div className="form-section-title">
                    <AlertStar /> {lang.SUBMISSION_CAVEATS}
                </div>

                {
                    Array(5).fill(0).map((val, idx) => (
                        <div
                            className="form-input-area"
                            key={idx}
                        >
                            <div className="li pre-line">
                                {lang[`SUBMISSION_CAVEAT_${idx + 1}`]}
                            </div>
                        </div>
                    ))
                }

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