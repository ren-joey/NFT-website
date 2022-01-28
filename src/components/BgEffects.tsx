import { useEffect } from 'react';
import bgEffectInit from 'src/animation/bgEffect';
import 'src/components/BgEffects.scss';
import { getParameterByName } from 'src/utils';

const BgEffects = () => {
    useEffect(() => {
        if (!getParameterByName('bg-effect')) {
            bgEffectInit();
        }
    }, []);

    return (
        <div className="bg-effects">
            <div className="perspective-lines"></div>

            <div id="canvasArea" className="canvas-area">
                <canvas id="canvas" />
            </div>

            <div className="black-hole"></div>
        </div>
    );
};

export default BgEffects;