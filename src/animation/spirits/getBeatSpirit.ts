import gsap, { Circ } from 'gsap';
import * as PIXI from 'pixi.js';
interface IDot {
    x: number,
    y: number
}

const getBeatSpirit = (app: PIXI.Application) => {
    const width = app.renderer.width;
    const height = app.renderer.height;
    const graphics = new PIXI.Graphics();
    const lineColor = 0xac2cc3;
    const amount = Math.floor(width / 100);
    const lines = 20;

    const dots: IDot[] = Array(amount);
    for (let i = 0; i < dots.length; i += 1) {
        const dot: IDot = { x: 0, y: 0 };
        const jump = height * (Math.random() * 0.1 + 0.03);
        dot.x = width / (amount + 2) * (i + 1);
        const tl = gsap.timeline({repeat: -1, repeatDelay: 0.05});
        tl.fromTo(dot, {y: 0}, {
            duration: 0.2,
            y: jump,
            ease: Circ.easeOut
        }).to(dot, {
            y: 0,
            duration: 0.25,
            ease: Circ.easeIn
        });
        dots[i] = dot as IDot;
    }

    const eachLine = (rate = 0) => {
        graphics.lineStyle(1, lineColor, 1);
        graphics.moveTo(0, 0);

        for (let i = 0; i < dots.length; i +=1 ) {
            const dot = dots[i];
            graphics.lineTo(dot.x, 0 - dot.y * rate);
        }
        graphics.lineTo(width, 0);
    };

    const draw = () => {
        graphics.clear();

        for (let i = 0; i < lines; i += 1) {
            eachLine(i * (1 / lines));
        }

        graphics.closePath();
    };
    draw();

    app.ticker.add(() => {
        draw();
    });

    const beatContainer = new PIXI.Container();
    beatContainer.addChild(graphics);
    beatContainer.y = height * 0.5;
    beatContainer.alpha = 0;
    return beatContainer;
};

export default getBeatSpirit;