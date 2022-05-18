import { useContext, useState } from 'react';
import 'src/components/Shared/SharedAlert.scss';
import { LangContext } from 'src/Context/LangContext';
import { getResources } from 'src/functions/loader';
import SharedButton from './Buttons/SharedButton';

const SoldOutAlert = () => {
    const [state, setState] = useState(true);
    const lang = useContext(LangContext);

    return (
        <div className={`alert-wrap ${state ? 'active' : ''}`}>
            <div className="alert-block gradient">
                <div className="skull-icon" style={
                    { backgroundImage: `url(${getResources('skull_icon')})` }
                }></div>

                <div className="alert-body">
                    <div className="alert-title">
                        {lang.SOLD_OUT_ALERT_TITLE_1}
                        <br />
                        {lang.SOLD_OUT_ALERT_TITLE_2}
                    </div>

                    <div className="alert-title xl">
                        {lang.SOLD_OUT_ALERT_TITLE_XL}
                    </div>

                    <div dangerouslySetInnerHTML={{
                        __html: lang.SOLD_OUT_ALERT_CONTENT
                    }}></div>

                    <div className="button-area">
                        <SharedButton
                            type="orange"
                            text={lang.CLOSE}
                            onClick={() => setState(false)}
                        />
                    </div>
                </div>

                <div className="angle left top"></div>
                <div className="angle left bottom"></div>
                <div className="angle right top"></div>
                <div className="angle right bottom"></div>
            </div>

            <div className="alert-mask"></div>
        </div>
    );
};

export default SoldOutAlert;