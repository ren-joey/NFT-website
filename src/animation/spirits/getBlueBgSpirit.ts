import * as PIXI from 'pixi.js';

const getBlueBgSpirit = (app: PIXI.Application) => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    const blue = new PIXI.Sprite(PIXI.Texture.WHITE);
    blue.tint = 0x000b42;
    blue.width = width;
    blue.height = height;
    blue.zIndex = 1;
    return blue;
};

export default getBlueBgSpirit;