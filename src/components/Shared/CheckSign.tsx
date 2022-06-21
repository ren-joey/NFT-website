import { CSSProperties } from "react";
import 'src/components/Shared/LoadingCircle.scss';

const defaultStyle: CSSProperties = {
    stroke: '#41A74F',
    fill: 'transparent',
    strokeWidth: 4,
    strokeDasharray: 82,
    strokeDashoffset: 0,
    strokeLinecap: 'round'
};

const CheckSign = ({
    style = {}
}: {
    style?: CSSProperties
}) => <svg style={{...defaultStyle, ...style}} viewBox="0 0 30 30">
    <g>
        <circle className="path" cx="15" cy="15" r="13" />
        <path d="M8.7 14.5, 14 20, 23 8" />
    </g>
</svg>;

export default CheckSign;
