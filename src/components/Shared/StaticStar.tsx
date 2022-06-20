import React from 'react';
import 'src/components/Shared/Star.scss';

const StaticStar = ({
    style = {}
}: {
    style?: React.CSSProperties
}) => (
    <svg viewBox="0 0 84.5 84.5">
        <g>
            <path
                style={
                    {
                        ...style,
                        display: 'block'
                    }
                }
                d="M42.25,0A42.26,42.26,0,0,1,0,42.25,42.25,42.25,0,0,1,42.25,84.5,42.24,42.24,0,0,1,84.5,42.25,42.25,42.25,0,0,1,42.25,0Z"
            />
        </g>
    </svg>
);

export default StaticStar;