import gsap, { Circ } from 'gsap';
import * as PIXI from 'pixi.js';

import preview_triangle_2 from 'src/assets/images/preview_triangle_2.png';
import preview_bg from 'src/assets/images/preview_bg.jpg';
import preview_box from 'src/assets/images/preview_box.png';
import preview_circle from 'src/assets/images/preview_circle.png';
import preview_triangle_1 from 'src/assets/images/preview_triangle_1.png';
import getBlueBgSpirit from './spirits/getBlueBgSpirit';
import getBgSpirit from './spirits/getBgSpirit';
import getFloatingElementSpirit from './spirits/getFloatingElementSpirit';
import getTextSpirit from './spirits/getTextSpirit';
import getGroundSpirit from './spirits/getGroundSpirit';
import getBeatSpirit from './spirits/getBeatSpirit';

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

    // container
    const groundContainer = getGroundSpirit(app);
    const bgContainer = new PIXI.Container();
    const floatingElementContainer = new PIXI.Container();
    const beatContainer = getBeatSpirit(app);
    const textContainer = getTextSpirit(app);
    textContainer.sortableChildren = true;

    setTimeout(() => {
        // bg
        if (resources.preview_bg.texture) {
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

        // const bAlienHead = document.getElementById('bAlienHead');
        // const tl2 = gsap.timeline({
        //     delay: 0.76,
        //     repeat: 3,
        //     repeatDelay: 0.05
        // });
        // tl2.fromTo(bAlienHead, {opacity: 1}, {
        //     duration: 0.2,
        //     opacity: 0.3,
        //     ease: Circ.easeOut
        // }).to(bAlienHead, {
        //     opacity: 1,
        //     duration: 0.25,
        //     ease: Circ.easeIn
        // });
    }, 2200);

    setTimeout(() => {
        // cubes
        const textures = [];
        if (resources.preview_triangle_2.texture) {
            textures.push(resources.preview_triangle_2.texture);
        }
        if (resources.preview_box.texture) {
            textures.push(resources.preview_box.texture);
        }
        if (resources.preview_circle.texture) {
            textures.push(resources.preview_circle.texture);
        }
        if (resources.preview_triangle_1.texture) {
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