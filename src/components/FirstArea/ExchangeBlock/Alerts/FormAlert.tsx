import { useContext, useEffect, useMemo, useState } from "react";
import { StableNft } from "src/@types/nft";
import { LangContext } from "src/Context/LangContext";
import 'src/components/FirstArea/ExchangeBlock/Alerts/FormAlert.scss';
import { EventBus } from "src/bus";
import collapseHeader from "src/animation/collapseHeader";
import enableGlobalAlert from "src/functions/enableGlobalAlert";
import formChecker from "./functions/formChecker";
import FormReadOnly from "./Form/FormReadOnly";
import FormEditor from "./Form/FormEditor";

export interface FormEssentials {
    form: FormData;
    aNft: StableNft;
    warning: FormWarning;
    setForm: (key: FormData|((key: FormData) => any)) => any;
    cancel: () => any;
    submit: () => any;
}

export interface FormWarning {
    term_1: string;
    term_2: string;
}

interface Terms {
    term_1: boolean;
    term_2: boolean;
}

export interface FormData extends Terms {
    name: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    zip: string;
    address: string;
}

export type FormMode = 'edit'|'readonly';

const defaultFrom = {
    name: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    zip: '',
    address: '',
    term_1: false,
    term_2: false
};

const FormAlert = ({
    selectedNfts
}: {
    selectedNfts: StableNft[]
}) => {
    const lang = useContext(LangContext);
    const [state, setState] = useState(false);
    const [mode, setMode] = useState<FormMode>('edit');
    const clickHandler = (cb = () => {}) => {
        setState(false);
        cb();
    };
    const [form, setForm] = useState<FormData>({...defaultFrom});
    const aNft = useMemo(() => selectedNfts[0], [selectedNfts]);
    const [warning, setWarning] = useState<FormWarning>({
        term_1: '',
        term_2: ''
    });

    const submit = () => {
        if (mode === 'edit') {
            formChecker(
                form,
                () => setMode('readonly'),
                (err) => setWarning(err)
            );
        } else if (mode === 'readonly') {
            // TODO:
        }
    };
    const cancel = () => {
        if (mode === 'edit') {
            enableGlobalAlert({
                content: '若您有填寫資料將不紀錄<br/>確定返回?',
                btnList: [
                    {text: '取消', type: 'gray'},
                    {text: '確定', onClick: () => setState(false)}
                ]
            });
        } else if (mode === 'readonly') {
            setMode('edit');
        }
    };
    const formEssentials: FormEssentials = {
        form,
        setForm,
        aNft,
        warning,
        cancel,
        submit
    };

    useEffect(() => EventBus.$on('form', (bool = true) => {
        collapseHeader();
        setState(bool);
    }), []);

    return (
        <div className={`alert-wrap start pointer-events-painted ${state ? 'active' : ''}`}>
            <div className="alert-block form">
                {
                    mode === 'edit' && (
                        <FormEditor {...formEssentials} />
                    )
                }

                {
                    mode === 'readonly' && (
                        <FormReadOnly {...formEssentials} />
                    )
                }
            </div>

            <div className="alert-mask"></div>
        </div>
    );
};

export default FormAlert;