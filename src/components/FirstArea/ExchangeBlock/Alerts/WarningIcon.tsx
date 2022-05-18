import React from "react";
import { getResources } from "src/functions/loader";

const defaultStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1rem',
    height: '1rem',
    backgroundRepeat: 'auto',
    backgroundSize: '100% 100%'
};

const WarningIcon = ({
    style = {}
}: {
    style?: React.CSSProperties
}) => {
    style = {
        ...defaultStyle,
        ...style,
        backgroundImage: `url(${getResources('warning_icon')})`
    };

    return (
        <div style={style}></div>
    );
};

export default WarningIcon;