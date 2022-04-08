import gsap, { Power4 } from 'gsap';
import * as PIXI from 'pixi.js';
import { DeviceString } from 'src/@types/basicVariable';

const getDevice: () => DeviceString = () => window.innerWidth >= 992 ? 'desktop' : 'phone';

const getGroundSpirit = (app: PIXI.Application) => {
    const linesContainer = new PIXI.Container();
    linesContainer.sortableChildren = true;

    const maxWidthRate = 50;
    const gap = getDevice() === 'desktop' ? 200 : 100;
    const duration = 1.5;
    const ease = Power4.easeIn;

    const width = app.renderer.width;
    const height = app.renderer.height;
    const lineColor = 0xac2cc3;

    // lines
    const pathGraphic = new PIXI.Graphics();
    pathGraphic.lineStyle(1, lineColor, 1);
    const maxWidth = width * maxWidthRate;
    const pivot = { x: width / 2, y: height * 0.47  };
    const quantity = Math.floor(width * maxWidthRate / gap);
    for (let i = 0; i < quantity; i += 1) {
        pathGraphic.moveTo(pivot.x, pivot.y);
        pathGraphic.lineTo(
            width / 2 + (
                (maxWidth / quantity * i) - (maxWidth * 0.5)
            ),
            height
        );
    }
    const mask = new PIXI.Graphics();
    mask.position.set(0, height / 2);
    mask.beginFill(lineColor);
    mask.drawRect(0, 0, width, 1);
    pathGraphic.mask = mask;
    pathGraphic.zIndex = 2;
    linesContainer.addChild(pathGraphic, mask);
    gsap.to(mask, {
        height: height / 2,
        duration,
        ease
    });

    for (let i = 0; i < 20; i += 1) {
        const graphic = new PIXI.Graphics();
        graphic.beginFill(lineColor);
        graphic.drawRect(0, height / 2, width, 1);
        graphic.endFill();
        gsap.to(graphic, {
            y: height / 2,
            duration,
            ease,
            repeat: -1,
            delay: 0.1 * i
        });
        graphic.zIndex = 2;
        linesContainer.addChild(graphic);
    }

    return linesContainer;
};

export default getGroundSpirit;
