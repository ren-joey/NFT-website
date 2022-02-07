import * as PIXI from 'pixi.js';
import getSpeedLineContainer from './spirits/getSpeedLineContainer';
import getBubbleContainer from './spirits/getBubbleContainer';
import getStarContainer from './spirits/getStarContainer';
import ResizeListener from 'src/functions/ResizeListener';
import getFrontEndBgSprite from './spirits/getFrontPageBgSprite';

const bgEffectInit = () => {
    const { resources } = PIXI.Loader.shared;

    const app = new PIXI.Application({
        view: document.getElementById('canvas') as HTMLCanvasElement,
        width: window.innerWidth,
        height: 2500
        // backgroundAlpha: 0
    });

    if (resources.bg?.texture) {
        const bgContainer = getFrontEndBgSprite(resources.bg.texture);
        app.stage.addChild(bgContainer);
    }

    if (resources.stars?.texture) {
        const starContainer = getStarContainer(resources.stars.texture);
        app.stage.addChild(starContainer);
    }

    if (resources.speed_lines?.texture) {
        const speedLineContainer = getSpeedLineContainer(resources.speed_lines.texture);
        app.stage.addChild(speedLineContainer);
    }

    const bubbleContainer = getBubbleContainer(resources);
    app.stage.addChild(bubbleContainer);

    ResizeListener.add(() => {
        app.renderer.resize(window.innerWidth, 2500);
    });
};

export default bgEffectInit;