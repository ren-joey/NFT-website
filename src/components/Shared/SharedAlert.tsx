import { useEffect, useState } from 'react';
import MintButton from "src/components/Shared/MintButton";
import 'src/components/Shared/SharedAlert.scss';
import SharedButton from './SharedButton';

interface IBtn {
    text: string;
    type?: 'default'|'gray';
    onClick: () => void;
}

export interface IAlertData {
    enable: boolean;
    content: string;
    btnList: IBtn[];
    // confirmText?: string,
    // onConfirm?: () => void,
    // cancelText?: string,
    // onCancel?: () => void
}

const SharedAlert = ({ enable, content, btnList }: IAlertData) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(enable);
    }, [enable]);

    return (
        <div className={`alert-wrap ${state ? 'active' : ''}`}>
            <div className="alert-block">
                <div className="alert-body">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>

                    <div className="button-area">
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
                        {/* {
                            (cancelText !== undefined && onCancel !== undefined)
                            && <SharedButton
                                type='gray'
                                text={cancelText}
                                onClick={() => {
                                    onCancel();
                                    setState(false);
                                }}
                            />
                        }

                        {
                            (confirmText !== undefined && onConfirm !== undefined)
                            && <SharedButton
                                text={confirmText}
                                onClick={() => {
                                    onConfirm();
                                    setState(false);
                                }}
                            />
                        } */}
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

export default SharedAlert;