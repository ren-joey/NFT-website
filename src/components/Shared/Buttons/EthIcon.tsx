import React from 'react';
import { getResources } from 'src/functions/loader';

interface IProps {
    size?: string
}

const EthIcon = ({ size = '1rem' }: IProps) => {
    const style: React.CSSProperties = {
        display: 'inline-block',
        width: size,
        height: size,
        backgroundImage: `url(${getResources('eth_icon')})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div
            className="eth-icon"
            style={style}
        >
        </div>
    );
};

export default EthIcon;