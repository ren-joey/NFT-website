import { Loader } from 'pixi.js';
import { useContext, useEffect, useState } from 'react';
import bgEffectInit from 'src/animation/bgEffect';
import { getParameterByName } from 'src/utils';

import 'src/components/BgEffects.scss';
import { getResources } from 'src/functions/loader';
import { EventContext } from 'src/Context/EventContext';

const BgEffects = () => {
    const { diff } = useContext(EventContext);

    useEffect(() => {
        if (!getParameterByName('bg-effect')) {
            bgEffectInit();
        }
    }, []);

    return (
        <div className="bg-effects">
            { diff > 0 && diff <= 60000 && <div className="red-warning"></div>}

            <div className="perspective-lines" style={
                {backgroundImage: `url(${Loader.shared.resources.perspective_lines.url})`}
            }></div>

            <div id="canvasArea" className="canvas-area">
                <canvas id="canvas" />
            </div>

            <div className="black-hole" style={
                { backgroundImage: `url(${getResources('black_hole')})` }
            }></div>
        </div>
    );
};

export default BgEffects;