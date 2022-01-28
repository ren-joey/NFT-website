import * as PIXI from 'pixi.js';
import { pixiTextGenerator } from 'src/animation/spirits/pixiTextGenerator';

const getTextSpirit = (app: PIXI.Application) => {
    const rootContainer = new PIXI.Container();
    const width = app.renderer.width;
    const height = app.renderer.height;
    const textContainer = new PIXI.Container();
    const textMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    const textAmount = window.innerWidth >= 992 ? 4 : 2;

    textContainer.mask = textMask;
    textContainer.sortableChildren = true;
    textMask.position.set(0, 0);
    textMask.width = width;
    textMask.height = height * 0.5;
    for (let i = 0; i < textAmount; i += 1) {
        const text = pixiTextGenerator(i);
        textContainer.addChild(text);
    }

    rootContainer.addChild(textContainer, textMask);
    return rootContainer;
};

export default getTextSpirit;