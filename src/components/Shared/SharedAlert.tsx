import { useEffect, useState } from 'react';
import 'src/components/Shared/SharedAlert.scss';
import SharedButton from './Buttons/SharedButton';
import { AlertData } from 'src/@types/viewVariables';
import { EventBus } from 'src/bus';
import { getResources } from 'src/functions/loader';
import { fixBody, releaseBody } from 'src/utils/nodeElement/bodyFixHelper';

const SharedAlert = ({
    id,
    content,
    btnList,
    className = '',
    closeBtnEnable = false,
    onStart = () => {}
}: AlertData) => {
    const [state, setState] = useState(false);
    const clickHandler = (cb = () => {}) => {
        releaseBody();
        setState(false);
        cb();
    };

    useEffect(() => EventBus.$on(id, (bool = true) => {
        fixBody();
        onStart();
        setState(bool);
    }), []);

    return (
        <div className={`alert-wrap pointer-events-painted ${state ? 'active' : ''} ${className}`}>
            <div className="alert-block">
                {
                    closeBtnEnable === true && (
                        <div
                            className="alert-cancel-icon"
                            style={
                                { backgroundImage: `url(${getResources('cancel_icon')})` }
                            }
                            onClick={() => clickHandler()}
                        >
                        </div>
                    )
                }

                <div className="alert-body">
                    {
                        typeof content === 'string'
                            ? <div dangerouslySetInnerHTML={{ __html: content }}></div>
                            : content
                    }

                    {
                        btnList.length > 0
                        && (
                            <div className="button-area">
                                {
                                    btnList.map((btn, idx) => (
                                        <SharedButton
                                            type={btn.type}
                                            text={btn.text}
                                            onClick={() => clickHandler(btn.onClick)}
                                            key={idx}
                                        />
                                    ))
                                }
                            </div>
                        )
                    }
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

export default SharedAlert;