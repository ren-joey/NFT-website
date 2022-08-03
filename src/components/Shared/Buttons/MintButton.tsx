import React from 'react';

interface IProps {
    disable?: boolean,
    style?: React.CSSProperties,
    text: string,
    onClick: () => any
}

const MintButton = ({ disable = false, style = {}, text, onClick }: IProps) => {
    const gradientColor = disable
        ? 'linear-gradient(to bottom, #a4a4a4 20%,#e3e3e3 77%)'
        : 'linear-gradient(to bottom, #ff009c 20%,#ff88f5 77%)';
    const boxDepth = disable ? '0 3px 0 #a5a5a5' : '0 3px 0 #fff';
    const boxShadow = disable ? '' : ', 0 5px 10px #ff009c, 0 5px 10px #ff009c, 0 5px 5px #5c0039';

    const mintButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '1rem 3rem',
        fontSize: '1.6rem',
        color: '#fff',
        fontWeight: 'bolder',
        borderRadius: '1.6rem',
        background: gradientColor,
        boxShadow: boxDepth + boxShadow,
        cursor: disable ? 'not-allowed' : 'pointer',
        ...style
    };

    const clickHandler = () => {
        if (disable === true) return;
        onClick();
    };

    return (
        <div
            className="mint-button"
            style={mintButtonStyle}
            onClick={clickHandler}
        >
            {text}
        </div>
    );
};

export default MintButton;