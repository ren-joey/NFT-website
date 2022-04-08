import { useContext, useMemo } from "react";
import { EventContext } from "src/Context/EventContext";
import { BtnColorList } from "src/@types/basicVariable";

interface IProps {
    type?: BtnColorList,
    style?: React.CSSProperties,
    text: string,
    onClick: () => void
}

const SharedButton = ({ type = 'default', style = {}, text, onClick }: IProps) => {
    const { device } = useContext(EventContext);
    let gradientColor: string;
    switch (type) {
        case 'gray':
            gradientColor = 'linear-gradient(to bottom, #a4a4a4 20%,#e3e3e3 77%)';
            break;
        case 'orange':
            gradientColor = 'linear-gradient(to bottom, #ff744d 20%, #FE0036 77%)';
            break;
        default:
            gradientColor = 'linear-gradient(to bottom, #ff009c 20%,#ff88f5 77%)';
    }
    const boxDepth = type === 'gray' ? '0 3px 0 #a5a5a5' : '0 3px 0 #fff';
    const boxShadow = type === 'gray' ? '' : ', 0 5px 10px #ff009c, 0 5px 10px #ff009c, 0 5px 5px #5c0039';

    const mintButtonStyle = useMemo(() => ({
        display: 'inline-block',
        margin: device === 'desktop' ? '0.1rem 0.5rem' : '0.1rem 0.3rem',
        padding: device === 'desktop' ? '0.5rem 2rem' : '0.4rem 1.2rem',
        fontSize: device === 'desktop' ? '1.2rem' : '1rem',
        lineHeight: device === 'desktop' ? '2rem' : '1.6rem',
        color: '#fff',
        fontWeight: 'bolder',
        borderRadius: '1.6rem',
        background: gradientColor,
        boxShadow: boxDepth + boxShadow,
        cursor: 'pointer',
        ...style
    }), [device]);

    return (
        <div
            className="mint-button"
            style={mintButtonStyle}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default SharedButton;