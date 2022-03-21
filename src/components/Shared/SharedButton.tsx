interface IProps {
    type?: 'default'|'gray',
    style?: React.CSSProperties,
    text: string,
    onClick: () => void
}

const SharedButton = ({ type = 'default', style = {}, text, onClick }: IProps) => {
    const gradientColor = type === 'gray'
        ? 'linear-gradient(to bottom, #a4a4a4 20%,#e3e3e3 77%)'
        : 'linear-gradient(to bottom, #ff009c 20%,#ff88f5 77%)';
    const boxDepth = type === 'gray' ? '0 3px 0 #a5a5a5' : '0 3px 0 #fff';
    const boxShadow = type === 'gray' ? '' : ', 0 5px 10px #ff009c, 0 5px 10px #ff009c, 0 5px 5px #5c0039';

    const mintButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '0 0.5rem',
        padding: '0.5rem 2rem',
        fontSize: '1.2rem',
        color: '#fff',
        fontWeight: 'bolder',
        borderRadius: '1.6rem',
        background: gradientColor,
        boxShadow: boxDepth + boxShadow,
        cursor: 'pointer',
        ...style
    };

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