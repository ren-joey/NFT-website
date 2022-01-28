import * as PIXI from 'pixi.js';

const getBeatSpirit = (app: PIXI.Application) => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    const graphics = new PIXI.Graphics();
    const lineColor = 0xac2cc3;
    graphics.lineStyle(1, lineColor, 1);

    const dots = Array(10).fill(Math.floor(width / 100));
    for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        //
    }

    const beatContainer = new PIXI.Container();
    return beatContainer;
};

export default getBeatSpirit;