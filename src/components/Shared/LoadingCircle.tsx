import { CSSProperties } from 'react';
import 'src/components/Shared/LoadingCircle.scss';

const LoadingCircle = ({
    size = {},
    path = {}
}: {
    size?: CSSProperties
    path?: CSSProperties
}) => (
    <svg
        style={size}
        viewBox="0 0 30 30"
        className="loading-circle"
    >
        <circle
            className="path"
            style={path}
            cx="15"
            cy="15"
            r="13"
        />
    </svg>
);

export default LoadingCircle;
