import React, { useContext, useEffect, useRef, useState } from 'react';
import 'src/components/Shared/SharedAlert.scss';
import { EventBus } from 'src/bus';
import SharedButton from '../Shared/Buttons/SharedButton';
import { Content } from 'src/@types/basicVariable';
import { LangContext } from 'src/Context/LangContext';
import { AlertData, IBtn } from 'src/@types/viewVariables';
import { getUuid } from 'src/utils';

interface UniqueAlertData extends AlertData {
    uuid: string
}

const GlobalAlert = () => {
    const lang = useContext(LangContext);
    const [uuid, setUuid] = useState('');
    const [state, setState] = useState(false);
    const [content, setContent] = useState<Content>('');
    const [closeBtnEnable , setCloseBtnEnable] = useState(false);
    const [btnList, setBtnList] = useState<IBtn[]>([]);
    const [alertDataList, setAlertDataList] = useState<UniqueAlertData[]>([]);

    const clickHandler = (cb = () => {}) => {
        setState(false);
        cb();

        // 關閉時將最前面一筆彈窗資料移除
        setAlertDataList((_alertDataList) => {
            const clone = [..._alertDataList];
            clone.shift();
            return clone;
        });
    };

    useEffect(() => {
        EventBus.$on('global-alert', (
            alertData: AlertData
        ) => {
            // 新彈窗請求時，放入彈窗佇列中
            setAlertDataList((alertDataList) => [
                ...alertDataList,
                {
                    uuid: getUuid(),
                    ...alertData
                }
            ]);
        });
    }, []);

    useEffect(() => {
        // 彈窗關閉後，若彈窗佇列中還有資料，再進行下一個彈窗
        if (alertDataList.length > 0) {
            const alertData = alertDataList[0];
            if (alertData.uuid !== uuid) {
                setState(true);
                setUuid(alertData.uuid);
                setContent(alertData.content);
                setCloseBtnEnable(alertData.closeBtnEnable || false);
                setBtnList(alertData.btnList);
            }
        }
    }, [alertDataList]);

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

                    <div className="button-area">
                        {
                            btnList.length > 0
                                ? btnList.map((btn, idx) => (
                                    <SharedButton
                                        type={btn.type}
                                        text={btn.text}
                                        onClick={() => clickHandler(btn.onClick)}
                                        key={idx}
                                    />
                                ))
                                : (
                                    <SharedButton
                                        text={lang.CONFIRM}
                                        onClick={() => clickHandler()}
                                    />
                                )
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

export default GlobalAlert;