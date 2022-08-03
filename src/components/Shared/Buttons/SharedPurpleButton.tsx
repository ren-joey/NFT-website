import { useEffect, useState } from 'react';
import 'src/components/Shared/Buttons/SharedPurpleButton.scss';

interface Props {
    disable?: boolean;
    style?: React.CSSProperties;
    text: string;
    onClick: (key?: any) => void
}

const SharedPurpleButton = ({
    text,
    disable = false,
    style = {},
    onClick
}: Props) => {
    const [state, setState] = useState(true);
    const clickHandler = () => {
        if (state) onClick();
    };

    useEffect(() => {
        if (disable) setState(false);
    }, [disable]);

    return (
        <div
            className={`shared-purple-button ${state ? '' : 'disabled'}`}
            onClick={() => clickHandler()}
            style={style}
        >
            <div className="text">
                {text}
            </div>

            <div className="corner-border left top"></div>
            <div className="corner-border left bottom"></div>
            <div className="corner-border right top"></div>
            <div className="corner-border right bottom"></div>
        </div>
    );
};

export default SharedPurpleButton;