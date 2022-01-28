import * as PIXI from 'pixi.js';

import speed_lines from 'src/assets/images/speed_lines.png';
import purple_ball_1 from 'src/assets/images/purple_ball_1.png';
import orange_ball_1 from 'src/assets/images/orange_ball_1.png';
import green_ball_1 from 'src/assets/images/green_ball_1.png';
import orange_ball_2 from 'src/assets/images/orange_ball_2.png';
import green_ball_2 from 'src/assets/images/green_ball_2.png';
import purple_ball_2 from 'src/assets/images/purple_ball_2.png';
import stars from 'src/assets/images/stars.png';

import getSpeedLineContainer from './spirits/getSpeedLineContainer';
import getBubbleContainer from './spirits/getBubbleContainer';
import getStarContainer from './spirits/getStarContainer';
import ResizeListener from 'src/functions/ResizeListener';

const pixiLoader = () => new Promise<any>((res) => {
    PIXI.Loader.shared
        .add('speed_lines', speed_lines)
        .add('purple_ball_1', purple_ball_1)
        .add('orange_ball_1', orange_ball_1)
        .add('green_ball_1', green_ball_1)
        .add('orange_ball_2', orange_ball_2)
        .add('green_ball_2', green_ball_2)
        .add('purple_ball_2', purple_ball_2)
        .add('stars', stars)
        .load((loader, resources) => {
            res(resources);
        });
});

const bgEffectInit = () => {
    pixiLoader().then((resources) => {
        const app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement,
            width: window.innerWidth,
            height: 2500,
            backgroundAlpha: 0
        });
        const speedLineContainer = getSpeedLineContainer(
            resources.speed_lines.texture
        );

        const starContainer = getStarContainer(resources.stars.texture);

        const bubbleContainer = getBubbleContainer(resources);
        app.stage.addChild(
            starContainer,
            speedLineContainer,
            bubbleContainer
        );

        ResizeListener.add(() => {
            app.renderer.resize(window.innerWidth, 2500);
        });
    });
};

export default bgEffectInit;