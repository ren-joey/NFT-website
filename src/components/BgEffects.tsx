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
            <div className="stars"></div>

            <div className="bubble-area">
                <div id="bubble1" className="bubble idx-1"></div>
                <div id="bubble2" className="bubble idx-2"></div>
                <div id="bubble3" className="bubble idx-3"></div>
                <div id="bubble4" className="bubble idx-4"></div>
                <div id="bubble5" className="bubble idx-5"></div>
                <div id="bubble6" className="bubble idx-6"></div>
                <div id="bubble7" className="bubble idx-7"></div>
                <div id="bubble8" className="bubble idx-8"></div>
                <div id="bubble9" className="bubble idx-9"></div>
                {/* <div id="bubble10" className="bubble idx-10"></div>
            <div id="bubble11" className="bubble idx-11"></div>
            <div id="bubble12" className="bubble idx-12"></div> */}
            </div>
        </div>
    );
};

export default BgEffects;