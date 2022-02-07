import * as PIXI from 'pixi.js';
import ResizeListener from 'src/functions/ResizeListener';

const getBgSpirit = (app: PIXI.Application, texture: PIXI.Texture) => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    const bg = new PIXI.Sprite(texture);
    bg.position.set(0, 0 - (height * 0.165));
    bg.width = width;
    bg.height = height;
    bg.zIndex = 1;

    ResizeListener.add(() => {
        bg.width = app.renderer.width;
        bg.height = app.renderer.height;
    });

    return bg;
};

export default getBgSpirit;