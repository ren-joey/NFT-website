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
import SubmitProcedure from "./Form/SubmitProcedure";
import { fixBody, releaseBody } from "src/utils/nodeElement/bodyFixHelper";

export interface FormEssentials {
    form: FormData;
    aNft: StableNft;
    warning: FormWarning;
    setForm: (key: FormData|((key: FormData) => any)) => any;
    cancel: (key?: boolean) => any;
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

export type FormMode = 'edit'|'readonly'|'sending';

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

// [DEV]
// const defaultFrom = {
//     name: 'joey',
//     phone: '09123456789',
//     email: 't@g.com',
//     country: '123',
//     city: '123',
//     zip: '123',
//     address: '123',
//     term_1: true,
//     term_2: true
// };

const FormAlert = ({
    selectedNfts
}: {
    selectedNfts: StableNft[]
}) => {
    const lang = useContext(LangContext);
    const [state, setState] = useState(false);
    const [mode, setMode] = useState<FormMode>('edit');
    const [form, setForm] = useState<FormData>({...defaultFrom});
    const aNft = useMemo(() => selectedNfts[0], [selectedNfts]);
    const [warning, setWarning] = useState<FormWarning>({
        term_1: '',
        term_2: ''
    });
    const closeFormAlert = () => {
        setState(false);
        releaseBody();
    };

    const submit = () => {
        if (mode === 'edit') {
            formChecker(
                form,
                () => setMode('readonly'),
                (err) => setWarning(err)
            );
        } else if (mode === 'readonly') {
            setMode('sending');
        }
    };
    const cancel = (forceClose = false) => {
        if (forceClose === true) {
            closeFormAlert();
            setMode('edit');
        } else if (mode === 'edit') {
            enableGlobalAlert({
                content: lang.FORM_CONTENT_WILL_BE_LOST,
                btnList: [
                    {text: lang.CANCEL, type: 'gray'},
                    {text: lang.CONFIRM, onClick: () => closeFormAlert()}
                ]
            });
        } else if (mode === 'readonly' || mode === 'sending') {
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
        fixBody();
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

                {
                    mode === 'sending' && (
                        <SubmitProcedure {...formEssentials} />
                    )
                }
            </div>

            <div className="alert-mask"></div>
        </div>
    );
};

export default FormAlert;