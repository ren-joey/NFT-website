import { useEffect, useState } from 'react';
import 'src/components/Shared/SharedAlert.scss';
import SharedButton from './Buttons/SharedButton';
import { IAlertData } from 'src/@types/viewVariables';

const SharedAlert = ({ enable, content, btnList }: IAlertData) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(enable);
    }, [enable]);

    return (
        <div className={`alert-wrap ${state ? 'active' : ''}`}>
            <div className="alert-block">
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
                                        onClick={btn.onClick}
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