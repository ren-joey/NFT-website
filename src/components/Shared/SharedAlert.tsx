import { useEffect, useState } from 'react';
import MintButton from "src/components/Shared/MintButton";
import 'src/components/Shared/SharedAlert.scss';
import SharedButton from './SharedButton';

interface IProps {
    enable: boolean,
    content: string,
    confirmText?: string,
    onConfirm?: () => void,
    cancelText?: string,
    onCancel?: () => void
}

const SharedAlert = ({ enable, content, confirmText, onConfirm, cancelText, onCancel }: IProps) => {
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
                        }
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