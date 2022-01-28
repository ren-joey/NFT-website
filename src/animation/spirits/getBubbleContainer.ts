import * as PIXI from 'pixi.js';
import { DeviceString } from 'src/Context/RwdContext';
import ResizeListener from 'src/functions/ResizeListener';
import { bubbleScrollTrigger } from '../bubbleScrollTrigger';

const getDevice: () => DeviceString = () => window.innerWidth >= 992 ? 'desktop' : 'phone';

interface IBubble {
    texture: PIXI.Texture,
    size: number,
    x: (() => number)|number,
    y: (() => number)|number
}

const getBubbleContainer = (resources: any) => {
    const bubbleContainer = new PIXI.Container();
    const device = getDevice();

    const bubbleGenerator = ({texture, size, x, y}: IBubble) => {
        const bubble = new PIXI.Sprite(texture);
        bubble.width = size;
        bubble.height = size;

        const bindPos = () => {
            bubble.x = typeof x === 'number' ? x : x();
            bubble.y = typeof y === 'number' ? y : y();
        };
        bindPos();
        ResizeListener.add(bindPos);

        return bubble;
    };

    const bubbleSpriteList: PIXI.Sprite[] = [];
    const bubbleAnimateSettings = [
        {
            texture: resources.green_ball_1.texture,
            size: 200,
            x: () => device === 'desktop' ? -100 : -150,
            y: () => window.innerHeight * 0.5
        },
        {
            texture: resources.orange_ball_1.texture,
            size: 60,
            x: () => window.innerWidth - (device === 'desktop' ? 100 : 10) - 60,
            y: () => window.innerHeight * 0.5
        },
        {
            texture: resources.orange_ball_2.texture,
            size: 500,
            x: -200,
            y: () => window.innerHeight * 0.6
        },
        {
            texture: resources.green_ball_2.texture,
            size: 60,
            x: 200,
            y: () => window.innerHeight * 0.8
        },
        {
            texture: resources.green_ball_2.texture,
            size: 40,
            x: () => window.innerWidth - 340,
            y: () => window.innerHeight * 0.2
        },
        {
            texture: resources.purple_ball_2.texture,
            size: 300,
            x: () => window.innerWidth * 0.9,
            y: () => window.innerHeight * 0.8
        },
        {
            texture: resources.purple_ball_1.texture,
            size: 100,
            x: () => window.innerWidth - 170,
            y: () => window.innerHeight * 0.2
        },
        {
            texture: resources.orange_ball_1.texture,
            size: 180,
            x: -100,
            y: () => window.innerHeight
        },
        {
            texture: resources.green_ball_1.texture,
            size: 130,
            x: () => window.innerWidth - 210,
            y: () => window.innerHeight
        }
    ];

    for (let i = 0; i < bubbleAnimateSettings.length; i += 1) {
        const bubble = bubbleGenerator(bubbleAnimateSettings[i]);
        bubbleContainer.addChild(bubble);
        bubbleSpriteList.push(bubble);
    }

    bubbleScrollTrigger(bubbleSpriteList);

    return bubbleContainer;
};

export default getBubbleContainer;