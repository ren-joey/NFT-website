import React from 'react';
import 'src/components/Shared/Star.scss';
import { getResources } from 'src/functions/loader';

const Star = ({
    isStatic = false,
    style = {}
}: {
    isStatic?: boolean,
    style?: React.CSSProperties
}) => (
    <div
        className={`star-icon ${isStatic ? 'static' : ''}`}
        style={
            {
                ...style,
                backgroundImage: `url(${getResources('glowing_star')})`
            }
        }
    >
    </div>
);

export default Star;