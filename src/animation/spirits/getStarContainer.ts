import * as PIXI from 'pixi.js';

const getStarContainer = (texture: PIXI.Texture) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const container = new PIXI.Container();
    const sprite = new PIXI.TilingSprite(texture);
    sprite.position.set(0, 0);
    sprite.width = width;
    sprite.height = height;
    container.addChild(sprite);

    return container;
};

export default getStarContainer;
