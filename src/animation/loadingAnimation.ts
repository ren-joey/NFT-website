import gsap, { Power4 } from 'gsap';
import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { DeviceString } from 'src/Context/RwdContext';

import preview_triangle_2 from 'src/assets/images/preview_triangle_2.png';
import preview_bg from 'src/assets/images/preview_bg.jpg';
import preview_box from 'src/assets/images/preview_box.png';
import preview_circle from 'src/assets/images/preview_circle.png';
import preview_triangle_1 from 'src/assets/images/preview_triangle_1.png';
import { pixiTextGenerator } from './pixiTextGenerator';

const getDevice: () => DeviceString = () => window.innerWidth >= 992 ? 'desktop' : 'phone';

const loadingAnimation = () => {
    const loader = new PIXI.Loader();
    let resources: {
        [key: string]: PIXI.LoaderResource
    } = {};
    loader
        .add('preview_triangle_2', preview_triangle_2)
        .add('preview_bg', preview_bg)
        .add('preview_box', preview_box)
        .add('preview_circle', preview_circle)
        .add('preview_triangle_1', preview_triangle_1);
    loader.load((loader, res) => {
        resources = res;
    });

    const app = new PIXI.Application({
        view: document.getElementById('loadingCanvas') as HTMLCanvasElement,
        width: window.innerWidth,
        height: window.innerHeight
    });

    // config
    const maxWidthRate = 50;
    const gap = getDevice() === 'desktop' ? 200 : 100;
    const duration = 1.5;
    const ease = Power4.easeIn;

    const height = window.innerHeight;
    const width = window.innerWidth;
    const color = 0xac2cc3;

    // container
    const linesContainer = new Container();

    // bg
    setTimeout(() => {
        if (resources.preview_bg.texture) {
            const blue = new PIXI.Sprite(PIXI.Texture.WHITE);
            blue.tint = 0x000b42;
            blue.width = width;
            blue.height = height;
            blue.zIndex = 1;

            const bg = new PIXI.Sprite(resources.preview_bg.texture);
            bg.position.set(0, 0 - (height * 0.165));
            bg.width = width;
            bg.height = height;
            bg.zIndex = 1;
            linesContainer.addChild(blue, bg);

            gsap.fromTo([bg, blue], {alpha: 0}, {
                alpha: 1,
                duration: 1
            });
        }
    }, 2200);

    // text
    const textContainer = new PIXI.Container();
    const textMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    textContainer.zIndex = 3;
    textContainer.mask = textMask;
    textContainer.sortableChildren = true;
    textMask.position.set(0, 0);
    textMask.width = width;
    textMask.height = height * 0.5;
    setTimeout(() => {
        for (let i = 0; i < 4; i += 1) {
            const text = pixiTextGenerator(i);
            textContainer.addChild(text);
        }
        app.stage.addChild(textContainer, textMask);
    }, 2200);

    // lines
    const pathGraphic = new PIXI.Graphics();
    // pathGraphic.beginFill(color);
    pathGraphic.lineStyle(1, color, 1);
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
    mask.beginFill(color);
    mask.drawRect(0, 0, width, 1);
    pathGraphic.mask = mask;
    pathGraphic.zIndex = 2;
    linesContainer.addChild(pathGraphic, mask);
    // app.stage.addChild(pathGraphic, mask);
    gsap.to(mask, {
        height: height / 2,
        duration,
        ease
    });

    for (let i = 0; i < 20; i += 1) {
        const graphic = new PIXI.Graphics();
        graphic.beginFill(color);
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
        // app.stage.addChild(graphic);
    }

    // const blurFilter = new PIXI.filters.BlurFilter();
    // blurFilter.blur = 0.1;
    // linesContainer.filters = [blurFilter];
    linesContainer.zIndex = 2;
    linesContainer.sortableChildren = true;
    app.stage.addChild(linesContainer);
};

export default loadingAnimation;