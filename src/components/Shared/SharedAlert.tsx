import { useEffect, useState } from 'react';
import 'src/components/Shared/SharedAlert.scss';
import SharedButton from './Buttons/SharedButton';
import { AlertData } from 'src/@types/viewVariables';
import { EventBus } from 'src/bus';

const SharedAlert = ({
    id,
    content,
    btnList,
    closeBtnEnable
}: AlertData) => {
    const [state, setState] = useState(false);
    const clickHandler = (cb = () => {}) => {
        setState(false);
        cb();
    };

    useEffect(() => EventBus.$on(id, (bool = true) => setState(bool)), []);

    return (
        <div className={`alert-wrap pointer-events-painted ${state ? 'active' : ''}`}>
            <div className="alert-block">
                {
                    closeBtnEnable === true && (
                        <div onClick={() => setState(false)}>close</div>
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
                        && <div className="button-area">
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