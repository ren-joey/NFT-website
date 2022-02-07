import gsap, { Circ } from 'gsap';
import * as PIXI from 'pixi.js';

import getBlueBgSpirit from './spirits/getBlueBgSpirit';
import getBgSpirit from './spirits/getBgSpirit';
import getFloatingElementSpirit from './spirits/getFloatingElementSpirit';
import getTextSpirit from './spirits/getTextSpirit';
import getGroundSpirit from './spirits/getGroundSpirit';
import getBeatSpirit from './spirits/getBeatSpirit';

const loadingAnimation = () => {
    const { resources } = PIXI.Loader.shared;

    const app = new PIXI.Application({
        view: document.getElementById('loadingCanvas') as HTMLCanvasElement,
        width: window.innerWidth,
        height: window.innerHeight
    });

    // container
    const groundContainer = getGroundSpirit(app);
    const bgContainer = new PIXI.Container();
    const floatingElementContainer = new PIXI.Container();
    const beatContainer = getBeatSpirit(app);
    const textContainer = getTextSpirit(app);
    textContainer.sortableChildren = true;

    setTimeout(() => {
        // bg
        if (resources.preview_bg?.texture) {
            const blue = getBlueBgSpirit(app);
            const bg = getBgSpirit(app, resources.preview_bg.texture);
            bgContainer.addChild(blue, bg);

            gsap.fromTo([bg, blue, beatContainer], {alpha: 0}, {
                alpha: 1,
                duration: 1
            });
        }

        const tl = gsap.timeline({
            delay: 0.1,
            repeat: -1,
            repeatDelay: 0.05
        });
        tl.fromTo(floatingElementContainer, {y: 0}, {
            duration: 0.2,
            y: -5,
            ease: Circ.easeOut
        }).to(floatingElementContainer, {
            y: 0,
            duration: 0.25,
            ease: Circ.easeIn
        });
    }, 2200);

    setTimeout(() => {
        // cubes
        const textures = [];
        if (resources.preview_triangle_2?.texture) {
            textures.push(resources.preview_triangle_2.texture);
        }
        if (resources.preview_box?.texture) {
            textures.push(resources.preview_box.texture);
        }
        if (resources.preview_circle?.texture) {
            textures.push(resources.preview_circle.texture);
        }
        if (resources.preview_triangle_1?.texture) {
            textures.push(resources.preview_triangle_1.texture);
        }

        if (textures.length > 0) {
            for (let i = 0; i < 200; i += 1) {
                const element = getFloatingElementSpirit(app, i, textures);
                floatingElementContainer.addChild(element);
            }
        }
    }, 1000);



    app.stage.addChild(
        bgContainer,
        groundContainer,
        beatContainer,
        textContainer,
        floatingElementContainer
    );
};

export default loadingAnimation;